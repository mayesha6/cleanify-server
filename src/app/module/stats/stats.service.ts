import Booking from '../booking/booking.model'
import Service from '../service/service.model'
import Slot from '../slot/slot.model'
import User from '../user/user.model'

const getAdminStats = async () => {
  const totalUsers = await User.countDocuments()
  const totalServices = await Service.countDocuments()
  const totalSlots = await Slot.countDocuments()
  const availableSlots = await Slot.find({
    isBooked: 'available',
  }).countDocuments()

  // Fetch the total number of bookings
  const totalBookings = await Booking.countDocuments()

  return {
    totalUsers,
    totalServices,
    totalSlots,
    availableSlots,
    totalBookings,
  }
}
const getUserStats = async (payload: Record<string, unknown>) => {
  const totalServices = await Service.countDocuments()
  const availableSlots = await Slot.find({
    isBooked: 'available',
  }).countDocuments()

  // Fetch the total number of bookings
  const totalBookings = await Booking.find({
    customer: payload?.customer,
  }).countDocuments()

  return {
    totalServices,
    availableSlots,
    totalBookings,
  }
}

export const statsService = {
  getAdminStats,
  getUserStats,
}
