const CourseBuy = require('../models/CourseBuy');
const Order = require('../models/Order');

class CourseBuyRepository {
    async getCourseBuysByUserId(userId) {
        try {
            return await CourseBuy.find({ userId });
        } catch (error) {
            throw new Error(`Error fetching course buys for user ID ${userId}: ${error.message}`);
        }
    }

    async createCourseBuy(courseBuyData) {
        try {
            return await CourseBuy.create(courseBuyData);
        } catch (error) {
            throw new Error(`Error creating course buy: ${error.message}`);
        }
    }

    async deleteCourseBuy(courseBuyId) {
        try {
            return await CourseBuy.findByIdAndDelete(courseBuyId);
        } catch (error) {
            throw new Error(`Error deleting course buy with ID ${courseBuyId}: ${error.message}`);
        }
    }

    async addCourseToCart(userId, courseId, qty) {
        let session = null;
        try {
            session = await CourseBuy.startSession();
            session.startTransaction();
            let courseBuy = await CourseBuy.findOne({ userId }).session(session);
            if (!courseBuy) {
                courseBuy = await CourseBuy.create([{ userId, items: [{ course: courseId, quantity: qty }] }], { session });
            } else {
                const existingItemIndex = courseBuy.items.findIndex(item => item.course.toString() === courseId.toString());
                if (existingItemIndex !== -1) {
                    courseBuy.items[existingItemIndex].quantity += qty;
                } else {
                    courseBuy.items.push({ course: courseId, quantity: qty });
                }
                await courseBuy.save({ session });
            }
            await session.commitTransaction();
            session.endSession();
            return courseBuy;
        } catch (error) {
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            throw new Error(`Error adding course to cart for user ID ${userId}: ${error.message}`);
        }
    }

    async removeCourseFromCart(userId, courseId) {
        let session = null;
        try {
            session = await CourseBuy.startSession();
            session.startTransaction();
            let courseBuy = await CourseBuy.findOne({ userId }).session(session);
            if (courseBuy) {
                courseBuy.items = courseBuy.items.filter(item => item.course.toString() !== courseId.toString());
                await courseBuy.save({ session });
            }
            await session.commitTransaction();
            session.endSession();
            return courseBuy;
        } catch (error) {
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            throw new Error(`Error removing course from cart for user ID ${userId}: ${error.message}`);
        }
    }

    async checkoutCourseBuy(userId) {
        let session = null;
        try {
            session = await CourseBuy.startSession();
            session.startTransaction();
            let courseBuy = await CourseBuy.findOne({ userId }).session(session);
            if (courseBuy) {
                const order = await this.createOrderFromCourseBuy(courseBuy, session);
                courseBuy.items = [];
                await courseBuy.save({ session });
                await session.commitTransaction();
                session.endSession();
                return order;
            }
            await session.abortTransaction();
            session.endSession();
            return null; // No course buy found
        } catch (error) {
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            throw new Error(`Error checking out course buy for user ID ${userId}: ${error.message}`);
        }
    }

    async createOrderFromCourseBuy(courseBuy, session) {
        // Calculate total amount based on the items in the course buy
        const amount = courseBuy.items.reduce((total, item) => total + (item.quantity * item.course.price), 0);
        const order = await Order.create([{ userId: courseBuy.userId, amount, status: 'pending', items: courseBuy.items }], { session });
        return order;
    }
}

module.exports = CourseBuyRepository;
