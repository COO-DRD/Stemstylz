import { useState } from 'react';
import { X, MapPin, Calendar, Clock, Users, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Vehicle {
  id: string;
  class: string;
  model: string;
  hourlyRate: number;
  passengers: number;
}

interface BookingData {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
}

interface BookingModalProps {
  bookingData: BookingData;
  selectedVehicle: Vehicle;
  onClose: () => void;
  onComplete: (booking: any) => void;
  apiUrl: string;
  publicAnonKey: string;
}

export function BookingModal({
  bookingData,
  selectedVehicle,
  onClose,
  onComplete,
  apiUrl,
  publicAnonKey
}: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [booking, setBooking] = useState<any>(null);

  // Calculate estimated price (3 hours minimum)
  const estimatedHours = 3;
  const totalPrice = selectedVehicle.hourlyRate * estimatedHours;

  const handleConfirmBooking = async () => {
    if (!customerName || !phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create booking
      const bookingResponse = await fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          ...bookingData,
          vehicleId: selectedVehicle.id,
          vehicleClass: selectedVehicle.class,
          vehicleModel: selectedVehicle.model,
          price: totalPrice,
          customerName,
          phoneNumber,
          email,
          estimatedHours
        })
      });

      const bookingResult = await bookingResponse.json();
      
      if (bookingResult.booking) {
        setBooking(bookingResult.booking);
        setStep('payment');
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!booking) return;

    setLoading(true);

    try {
      // Process payment
      const paymentResponse = await fetch(`${apiUrl}/payments/mpesa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          bookingId: booking.id,
          amount: totalPrice,
          phoneNumber
        })
      });

      const paymentResult = await paymentResponse.json();
      
      if (paymentResult.payment) {
        setStep('success');
        setTimeout(() => {
          onComplete(booking);
        }, 3000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#1D4ED8]">
              {step === 'details' && 'Confirm Your Booking'}
              {step === 'payment' && 'Complete Payment'}
              {step === 'success' && 'Booking Confirmed!'}
            </h2>
            {step !== 'success' && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'details' && (
              <div className="space-y-6">
                {/* Trip Summary */}
                <div className="bg-[#F9FAFB] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">Trip Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-[#059669] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-[#4B5563]">Pickup</div>
                        <div className="font-medium text-[#111827]">{bookingData.pickup}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-[#1D4ED8] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-[#4B5563]">Dropoff</div>
                        <div className="font-medium text-[#111827]">{bookingData.dropoff}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#4B5563] flex-shrink-0" />
                      <div className="font-medium text-[#111827]">
                        {bookingData.date || 'Today'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-[#4B5563] flex-shrink-0" />
                      <div className="font-medium text-[#111827]">
                        {bookingData.time || 'ASAP'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-[#4B5563] flex-shrink-0" />
                      <div className="font-medium text-[#111827]">
                        {bookingData.passengers} Passenger{bookingData.passengers > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Summary */}
                <div className="bg-[#F9FAFB] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">Selected Vehicle</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-[#1D4ED8]">{selectedVehicle.class}</div>
                      <div className="text-[#4B5563]">{selectedVehicle.model}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#059669]">
                        KSh {totalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-[#4B5563]">{estimatedHours} hours estimated</div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#111827]">Your Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Phone Number (M-Pesa) *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+254 700 000 000"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleConfirmBooking}
                  disabled={loading || !customerName || !phoneNumber}
                  className="w-full bg-[#059669] text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-[#047857] transition-all duration-300 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Proceed to Payment</span>
                  )}
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                {/* Payment Summary */}
                <div className="bg-[#F9FAFB] rounded-xl p-6 text-center">
                  <div className="mb-4">
                    <div className="text-sm text-[#4B5563] mb-2">Total Amount</div>
                    <div className="text-4xl font-bold text-[#059669]">
                      KSh {totalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-[#4B5563] space-y-1">
                    <div>{bookingData.pickup} → {bookingData.dropoff}</div>
                    <div>{selectedVehicle.class} • {bookingData.date} {bookingData.time}</div>
                    <div className="text-[#059669] font-medium mt-2">
                      45min FREE airport wait time included
                    </div>
                  </div>
                </div>

                {/* M-Pesa Instructions */}
                <div className="bg-[#25D366]/10 border-2 border-[#25D366] rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CreditCard className="w-6 h-6 text-[#25D366]" />
                    <h3 className="text-lg font-semibold text-[#111827]">M-Pesa Payment</h3>
                  </div>
                  <p className="text-[#4B5563] mb-4">
                    An M-Pesa STK Push will be sent to <strong>{phoneNumber}</strong>
                  </p>
                  <ul className="space-y-2 text-sm text-[#4B5563]">
                    <li>• Enter your M-Pesa PIN when prompted</li>
                    <li>• Your booking will be confirmed automatically</li>
                    <li>• You'll receive a confirmation SMS</li>
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-[#059669] text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-[#047857] transition-all duration-300 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Pay KSh {totalPrice.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-24 h-24 bg-[#059669] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-16 h-16 text-white" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-[#059669] mb-4">
                  Booking Confirmed!
                </h3>
                
                <p className="text-xl text-[#111827] mb-6">
                  Driver Ahmed assigned! 8min away
                </p>
                
                <div className="bg-[#F9FAFB] rounded-xl p-6 mb-6">
                  <div className="text-sm text-[#4B5563] mb-2">Booking Reference</div>
                  <div className="text-2xl font-mono font-bold text-[#111827]">
                    {booking?.id.split(':')[1]?.substring(0, 8).toUpperCase()}
                  </div>
                </div>
                
                <p className="text-[#4B5563] mb-6">
                  You'll receive SMS and WhatsApp updates about your ride
                </p>
                
                <button
                  onClick={() => onComplete(booking)}
                  className="bg-[#059669] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#047857] transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
