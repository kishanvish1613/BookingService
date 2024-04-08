const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('../services/index');
const {createChannel, publishmessage} = require('../utils/messageQueue')
const {REMINDER_BINDING_KEY} = require('../config/serverConfig');

const bookingService = new BookingService();
class BookingController {
    constructor() {

    }

    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: 'This is a noti from queue',
                content: 'Some queue will subscribe this',
                recepientEmail: 'kishanvishwakarma1613@gmail.com',
                notificationTime: '2024-01-08T08:30:00'
            },
            service: 'CREATE_TICKET'
        };
        publishmessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(200).json({
            message: "Successfully published the event"
        });
    }

    async create(req, res){
        try {
            const response = await bookingService.createBooking(req.body);
            console.log(response);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        }catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }

    async info(req, res){
        try {
            return res.status(StatusCodes.OK).json({
                message: "inside info",
                success: true,
                err: {},
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
    
}


module.exports = BookingController;