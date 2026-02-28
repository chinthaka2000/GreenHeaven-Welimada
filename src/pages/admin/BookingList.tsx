import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Booking {
  id: string;
  name: string;
  email: string;
  mobile: string;
  booking_date: string;
  guests: string;
  message: string;
  status: string;
  created_at: string;
}

export function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;
      await fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  // Helper function to check if booking is in the past
  const isPast = (dateString: string) => {
    return new Date(dateString) < new Date(new Date().setHours(0, 0, 0, 0));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin-slow w-12 h-12 border-4 border-sage-green border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/50">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="font-serif text-4xl text-forest-moss mb-4">Bookings</h1>
          <p className="font-mono text-sm tracking-widest uppercase text-forest-moss/60">
            Manage your reservations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`border rounded-2xl p-6 transition-all ${isPast(booking.booking_date) ? 'bg-black/5 border-transparent opacity-75' : 'bg-white border-black/10 hover:shadow-md'}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-serif text-2xl font-bold text-forest-moss">{booking.booking_date}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase ${isPast(booking.booking_date) ? 'bg-black/10 text-forest-moss/60' : 'bg-sage-green/20 text-forest-moss'}`}>
                    {isPast(booking.booking_date) ? 'Past' : 'Upcoming'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm font-mono tracking-wide text-forest-moss/80">
                  <div>
                    <span className="block text-xs uppercase opacity-60 mb-1">Name</span>
                    {booking.name}
                  </div>
                  <div>
                    <span className="block text-xs uppercase opacity-60 mb-1">Contact</span>
                    {booking.mobile}
                    <br />
                    {booking.email}
                  </div>
                  <div>
                    <span className="block text-xs uppercase opacity-60 mb-1">Guests</span>
                    {booking.guests}
                  </div>
                </div>

                {booking.message && (
                  <div className="p-4 bg-stone-50 rounded-xl text-sm italic text-forest-moss/80 border border-black/5">
                    "{booking.message}"
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto mt-4 md:mt-0">
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="px-6 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-mono text-sm tracking-widest uppercase transition-colors w-full md:w-auto"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-20 border border-dashed border-black/20 rounded-2xl">
            <p className="font-mono text-sm tracking-widest uppercase text-forest-moss/60">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}
