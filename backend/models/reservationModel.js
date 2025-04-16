import {
  // TitleReservation,
  UserReservation,
} from '../schemas/reservationSchema.js'

// id Pelicula: 673a45fcc477dbf8de2e04cd
// userReservation tambien lleva date y time por parametro

export class ReservationModel {
  static async createUserReservation({reservation}) {
    try {
      const newUserReservation = new UserReservation({...reservation})
      await newUserReservation.save()

      return newUserReservation
    } catch (error) {
      return {error: 'Error while creating the reservation'}
    }
  }

  static async getUserReservations({userId}) {
    return await UserReservation.find({user: userId})
  }

  static async getAllReservations() {
    try {
      const reservations = await UserReservation.find()
        .populate('movie')
        .populate('user')

      const reservationsWithDetails = reservations.map(reservation => ({
        _id: reservation._id,
        username: reservation.user.username,
        movieName: reservation.movie.title,
        date: reservation.date,
        time: reservation.time,
        seats: reservation.seats,
      }))

      return reservationsWithDetails
    } catch (error) {
      return {error: 'Error while fetching reservations'}
    }
  }

  static async getReservationById({id}) {
    return await UserReservation.findById(id)
  }

  static async delete({id}) {
    try {
      const reservation = await UserReservation.findById(id)
      await reservation.deleteOne()
      return {
        message: 'Reservation deleted successfully',
      }
    } catch (error) {
      return {
        error: 'An error ocurred while delete the reservation',
      }
    }
  }
}
