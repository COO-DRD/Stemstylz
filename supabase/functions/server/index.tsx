import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-05c3abc2/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ BOOKING ROUTES ============

// Create booking (no auth required for MVP)
app.post("/make-server-05c3abc2/bookings", async (c) => {
  try {
    const body = await c.req.json();
    const bookingId = `booking:${Date.now()}`;
    
    const booking = {
      id: bookingId,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentStatus: 'pending'
    };

    await kv.set(bookingId, booking);

    return c.json({ booking, message: 'Booking created successfully' });
  } catch (error) {
    console.log(`Create booking error: ${error}`);
    return c.json({ error: 'Internal server error creating booking' }, 500);
  }
});

// Get all bookings
app.get("/make-server-05c3abc2/bookings", async (c) => {
  try {
    const allBookings = await kv.getByPrefix('booking:');
    return c.json({ bookings: allBookings.filter(b => b !== null) });
  } catch (error) {
    console.log(`Get bookings error: ${error}`);
    return c.json({ error: 'Internal server error fetching bookings' }, 500);
  }
});

// Get single booking
app.get("/make-server-05c3abc2/bookings/:id", async (c) => {
  try {
    const bookingId = c.req.param('id');
    const booking = await kv.get(bookingId);
    
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    return c.json({ booking });
  } catch (error) {
    console.log(`Get booking error: ${error}`);
    return c.json({ error: 'Internal server error fetching booking' }, 500);
  }
});

// Update booking status
app.put("/make-server-05c3abc2/bookings/:id", async (c) => {
  try {
    const bookingId = c.req.param('id');
    const body = await c.req.json();
    
    const existingBooking = await kv.get(bookingId);
    if (!existingBooking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    const updatedBooking = {
      ...existingBooking,
      ...body,
      updatedAt: new Date().toISOString()
    };

    await kv.set(bookingId, updatedBooking);
    return c.json({ booking: updatedBooking });
  } catch (error) {
    console.log(`Update booking error: ${error}`);
    return c.json({ error: 'Internal server error updating booking' }, 500);
  }
});

// ============ PAYMENT ROUTES ============

// Process payment (M-Pesa simulation)
app.post("/make-server-05c3abc2/payments/mpesa", async (c) => {
  try {
    const body = await c.req.json();
    const { bookingId, amount, phoneNumber } = body;

    // Simulate M-Pesa STK Push
    const paymentId = `payment:${Date.now()}`;
    const payment = {
      id: paymentId,
      bookingId,
      amount,
      phoneNumber,
      method: 'mpesa',
      status: 'success',
      transactionId: `MPesa${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    await kv.set(paymentId, payment);

    // Update booking payment status
    const booking = await kv.get(bookingId);
    if (booking) {
      booking.paymentStatus = 'completed';
      booking.paymentId = paymentId;
      booking.status = 'confirmed';
      await kv.set(bookingId, booking);
    }

    return c.json({ payment, message: 'Payment successful' });
  } catch (error) {
    console.log(`Payment processing error: ${error}`);
    return c.json({ error: 'Internal server error processing payment' }, 500);
  }
});

// ============ VEHICLE ROUTES ============

// Get all vehicles
app.get("/make-server-05c3abc2/vehicles", async (c) => {
  try {
    const vehicles = await kv.getByPrefix('vehicle:');
    const validVehicles = vehicles.filter(v => v !== null);
    
    // If no vehicles, return defaults
    if (validVehicles.length === 0) {
      return c.json({ vehicles: getDefaultVehicles() });
    }
    
    return c.json({ vehicles: validVehicles });
  } catch (error) {
    console.log(`Get vehicles error: ${error}`);
    return c.json({ error: 'Internal server error fetching vehicles' }, 500);
  }
});

// ============ LOCATION ROUTES ============

// Get popular locations
app.get("/make-server-05c3abc2/locations", (c) => {
  try {
    const locations = [
      { id: '1', name: 'Moi International Airport (MBA)', code: 'MBA', lat: -4.0343, lng: 39.5942 },
      { id: '2', name: 'Sarova Whitesands Beach Resort', code: 'SW', lat: -4.0435, lng: 39.7297 },
      { id: '3', name: 'Mombasa CBD', code: 'CBD', lat: -4.0561, lng: 39.6631 },
      { id: '4', name: 'Nyali Centre', code: 'NYC', lat: -4.0299, lng: 39.7058 },
      { id: '5', name: 'Diani Beach', code: 'DB', lat: -4.2829, lng: 39.5797 },
      { id: '6', name: 'Bamburi Beach', code: 'BB', lat: -3.9833, lng: 39.7333 },
      { id: '7', name: 'Mombasa Port', code: 'MBP', lat: -4.0669, lng: 39.6294 },
      { id: '8', name: 'Voyager Beach Resort', code: 'VBR', lat: -3.9825, lng: 39.7381 }
    ];
    
    return c.json({ locations });
  } catch (error) {
    console.log(`Get locations error: ${error}`);
    return c.json({ error: 'Internal server error fetching locations' }, 500);
  }
});

// ============ DRIVER ROUTES ============

// Get available rides for driver
app.get("/make-server-05c3abc2/driver/available-rides", async (c) => {
  try {
    const allBookings = await kv.getByPrefix('booking:');
    const availableRides = allBookings.filter(
      b => b && (b.status === 'pending' || b.status === 'confirmed') && !b.driverId
    );

    return c.json({ rides: availableRides });
  } catch (error) {
    console.log(`Get available rides error: ${error}`);
    return c.json({ error: 'Internal server error fetching rides' }, 500);
  }
});

// Accept ride
app.post("/make-server-05c3abc2/driver/accept-ride", async (c) => {
  try {
    const body = await c.req.json();
    const { bookingId, driverId, driverName } = body;

    const booking = await kv.get(bookingId);
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    booking.driverId = driverId;
    booking.driverName = driverName || 'Ahmed';
    booking.status = 'assigned';
    booking.assignedAt = new Date().toISOString();
    
    await kv.set(bookingId, booking);

    return c.json({ booking, message: 'Ride accepted successfully' });
  } catch (error) {
    console.log(`Accept ride error: ${error}`);
    return c.json({ error: 'Internal server error accepting ride' }, 500);
  }
});

// ============ ANALYTICS ROUTES ============

// Get analytics
app.get("/make-server-05c3abc2/analytics", async (c) => {
  try {
    const allBookings = await kv.getByPrefix('booking:');
    const today = new Date().toISOString().split('T')[0];
    
    const todayBookings = allBookings.filter(
      b => b && b.createdAt?.startsWith(today)
    );

    const completedBookings = allBookings.filter(
      b => b && b.paymentStatus === 'completed'
    );

    const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.price || 0), 0);

    const analytics = {
      ridesToday: todayBookings.length,
      totalRides: allBookings.length,
      totalRevenue,
      averageRideValue: completedBookings.length > 0 ? totalRevenue / completedBookings.length : 0,
      recentBookings: allBookings.slice(-10).reverse()
    };

    return c.json({ analytics });
  } catch (error) {
    console.log(`Get analytics error: ${error}`);
    return c.json({ error: 'Internal server error fetching analytics' }, 500);
  }
});

// Helper function for default vehicles
function getDefaultVehicles() {
  return [
    {
      id: 'vehicle:economy',
      class: 'ECONOMY',
      model: 'Toyota Premio',
      hourlyRate: 1500,
      passengers: 4,
      available: true,
      badge: 'Available',
      features: ['Air Conditioning', 'Clean Interior', 'Professional Driver']
    },
    {
      id: 'vehicle:business',
      class: 'BUSINESS',
      model: 'Mercedes E-Class',
      hourlyRate: 3500,
      passengers: 4,
      available: true,
      badge: 'Airport Recommended',
      features: ['Luxury Interior', 'Wi-Fi', 'Bottled Water', 'Phone Charger']
    },
    {
      id: 'vehicle:premium',
      class: 'PREMIUM',
      model: 'Range Rover',
      hourlyRate: 6000,
      passengers: 5,
      available: true,
      badge: 'Luxury',
      features: ['VIP Treatment', 'Premium Sound System', 'Extra Legroom', 'Refreshments']
    }
  ];
}

// Initialize default vehicles on startup
const initializeDefaultVehicles = async () => {
  try {
    const defaultVehicles = getDefaultVehicles();
    for (const vehicle of defaultVehicles) {
      const existing = await kv.get(vehicle.id);
      if (!existing) {
        await kv.set(vehicle.id, vehicle);
      }
    }
    console.log('Default vehicles initialized');
  } catch (error) {
    console.error('Error initializing default vehicles:', error);
  }
};

// Initialize on startup
initializeDefaultVehicles();

Deno.serve(app.fetch);
