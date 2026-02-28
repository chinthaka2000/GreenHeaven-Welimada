import React, { useState, useEffect } from 'react';
import { Section } from '../ui/Section';
import { GlassCard } from '../ui/GlassCard';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    checkIn: '',
    guests: '1 Guest',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookedDates, setBookedDates] = useState<string[]>([]);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('booking_date');
      if (data && !error) {
        setBookedDates(data.map(d => d.booking_date));
      }
    };
    fetchBookings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.checkIn) {
      setErrorMsg('Please select a check-in date from the calendar.');
      return;
    }
    setStatus('submitting');

    if (bookedDates.includes(formData.checkIn)) {
      setErrorMsg('This date is already booked. Please select another date.');
      setStatus('idle');
      return;
    }

    try {
      const { error } = await supabase.from('bookings').insert([{
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        booking_date: formData.checkIn,
        guests: formData.guests,
        message: formData.message
      }]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('This date is already booked. Please select another date.');
        }
        throw error;
      }

      setStatus('success');
      setBookedDates([...bookedDates, formData.checkIn]);
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', mobile: '', checkIn: '', guests: '1 Guest', message: '' });
      }, 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while booking. Please try again.');
      setStatus('idle');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentMonth);
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);
  const standardBlanks = Array.from({ length: firstDay }, (_, i) => i);

  const formatDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isPastDate = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(dateString);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  return (
    <Section id="booking" className="py-24 relative">
      <div className="absolute inset-0 bg-stone-50/50 -z-10" />

      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="font-mono text-sage-green text-sm tracking-[0.3em] uppercase mb-4 font-bold">
            Reserve Your Stay
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl text-forest-moss font-bold">
            Begin Your Journey
          </h3>
        </div>

        <GlassCard className="overflow-hidden bg-white/90 border border-forest-moss/10 shadow-2xl rounded-3xl p-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">

            {/* Left Image Section */}
            <div className="block lg:col-span-2 relative min-h-[250px] lg:min-h-0">
              <img
                src="/images/hero_landscape.png"
                alt="GreenHaven Farm Landscape"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-moss/95 via-forest-moss/40 to-transparent"></div>
              <div className="absolute bottom-6 lg:bottom-12 left-6 lg:left-10 right-6 lg:right-10 text-white shadow-sm">
                <h4 className="font-serif text-2xl lg:text-3xl mb-2 lg:mb-3 text-white">Unwind in Nature</h4>
                <p className="font-sans text-xs lg:text-sm text-white/90 leading-relaxed max-w-sm">
                  Experience the quiet beauty of rural Sri Lanka. Our farm is designed for those seeking peace, authentic connections, and organic living.
                </p>
                <div className="mt-4 lg:mt-8 space-y-2 font-mono text-[10px] lg:text-xs tracking-widest uppercase text-white/70">
                  <p className="flex items-center gap-2"><span className="w-4 h-[1px] bg-white/50"></span> +94 77 123 4567</p>
                  <p className="flex items-center gap-2"><span className="w-4 h-[1px] bg-white/50"></span> hello@greenhaven.lk</p>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="lg:col-span-3 p-8 md:p-12 lg:p-16 relative bg-white border-l border-forest-moss/5">
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center text-center p-8 lg:rounded-r-3xl"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 15, delay: 0.1 }}
                      className="w-24 h-24 bg-sage-green/10 text-sage-green rounded-full flex items-center justify-center mb-8 border border-sage-green/20"
                    >
                      <CheckCircle2 size={48} strokeWidth={1.5} />
                    </motion.div>
                    <h4 className="font-serif text-4xl text-forest-moss font-bold mb-4">Request Confirmed.</h4>
                    <p className="font-sans text-forest-moss/70 max-w-sm text-lg leading-relaxed">
                      We have secured your date. We will contact you shortly with further details.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-10">

                {/* 1. Date Selection via Custom Calendar */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.2em] text-forest-moss/70 mb-5 font-bold flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-forest-moss/5 flex items-center justify-center text-[10px]">1</span>
                    Select a Date
                  </label>

                  <div className="border border-forest-moss/10 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
                    {/* Calendar Header */}
                    <div className="flex justify-between items-center p-4 bg-stone-50 border-b border-forest-moss/5">
                      <button type="button" onClick={prevMonth} className="p-2 hover:bg-black/5 rounded-full transition-colors text-forest-moss/60 focus:outline-none focus:ring-2 focus:ring-sage-green">
                        <ChevronLeft size={20} />
                      </button>
                      <h4 className="font-serif text-xl font-bold text-forest-moss tracking-wide">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h4>
                      <button type="button" onClick={nextMonth} className="p-2 hover:bg-black/5 rounded-full transition-colors text-forest-moss/60 focus:outline-none focus:ring-2 focus:ring-sage-green">
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-5">
                      <div className="grid grid-cols-7 gap-1 mb-3">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day} className="text-center font-mono text-[10px] uppercase tracking-widest text-forest-moss/40 font-bold py-1">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                        {standardBlanks.map(b => <div key={`blank-${b}`} className="h-10"></div>)}
                        {daysArray.map(day => {
                          const dateString = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                          const isBooked = bookedDates.includes(dateString);
                          const isPast = isPastDate(dateString);
                          const isSelected = formData.checkIn === dateString;
                          const isDisabled = isBooked || isPast;

                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => {
                                setFormData({ ...formData, checkIn: dateString });
                                setErrorMsg('');
                              }}
                              className={`
                                h-10 w-full rounded-xl text-sm font-sans flex items-center justify-center transition-all relative font-medium
                                ${isSelected ? 'bg-sage-green text-white font-bold shadow-md scale-105' : 'hover:bg-stone-100'}
                                ${isPast ? 'text-black/20 cursor-not-allowed hidden md:flex' : ''}
                                ${isBooked ? 'text-red-400 bg-red-50 cursor-not-allowed line-through' : (isSelected ? 'text-white' : 'text-forest-moss')}
                              `}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Guest Details */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.2em] text-forest-moss/70 mb-5 font-bold flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-forest-moss/5 flex items-center justify-center text-[10px]">2</span>
                    Guest Details
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-stone-50/50 border-0 border-b-2 border-forest-moss/10 px-4 py-3 text-forest-moss placeholder-forest-moss/40 focus:ring-0 focus:border-sage-green focus:bg-stone-50 transition-all peer rounded-t-xl"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-stone-50/50 border-0 border-b-2 border-forest-moss/10 px-4 py-3 text-forest-moss placeholder-forest-moss/40 focus:ring-0 focus:border-sage-green focus:bg-stone-50 transition-all peer rounded-t-xl"
                      />
                    </div>
                    <div className="relative group md:col-span-2">
                      <input
                        type="tel"
                        name="mobile"
                        required
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full bg-stone-50/50 border-0 border-b-2 border-forest-moss/10 px-4 py-3 text-forest-moss placeholder-forest-moss/40 focus:ring-0 focus:border-sage-green focus:bg-stone-50 transition-all peer rounded-t-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Stay Preferences */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full bg-stone-50/50 border-0 border-b-2 border-forest-moss/10 px-4 py-4 text-forest-moss placeholder-forest-moss/40 focus:ring-0 focus:border-sage-green focus:bg-stone-50 transition-all appearance-none cursor-pointer rounded-t-xl font-medium"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="Family (3-4)">Family (3-4)</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-forest-moss/40">
                        <ChevronRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Message */}
                <div className="relative group">
                  <textarea
                    rows={2}
                    name="message"
                    placeholder="Special Requests or Messages (Optional)"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-stone-50/50 border-0 border-b-2 border-forest-moss/10 px-4 py-3 text-forest-moss placeholder-forest-moss/40 focus:ring-0 focus:border-sage-green focus:bg-stone-50 transition-all resize-none rounded-t-xl"
                  ></textarea>
                </div>

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-mono tracking-widest flex items-center justify-between"
                  >
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || !!errorMsg || !formData.checkIn}
                  className="w-full py-5 rounded-2xl bg-forest-moss text-white font-mono font-bold uppercase tracking-[0.2em] hover:bg-forest-moss/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mt-4 relative overflow-hidden group shadow-lg shadow-forest-moss/10"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'submitting' ? 'Confirming...' : (formData.checkIn ? `Book for ${formData.checkIn}` : 'Select a Date')}
                  </span>
                  {!formData.checkIn && (
                    <div className="absolute inset-0 bg-black/20 z-0"></div>
                  )}
                </button>
              </form>
            </div>

          </div>
        </GlassCard>
      </div>
    </Section>
  );
}