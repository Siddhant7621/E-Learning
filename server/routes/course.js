import express from 'express';
import { checkout, fetchLecture, fetchLectures, getAllCourses, getMyCourses, getSingleCourse,  } from '../controllers/course.js';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';
import Stripe from 'stripe';
import { User } from '../models/User.js';
import { Courses } from '../models/Courses.js';

const stripeKey = 'sk_test_51OuvygSFotcfnJdU4e4x0XaRa4WkzqaN308EnDn1RaugHgkJrd7ftIPI4KgMjSAWw60BOSw87ZJIhvq4uWvCze1j00SM9AUHxg';
const stripe = Stripe(stripeKey);


const router = express.Router();

router.get("/course/all", getAllCourses)
router.get("/course/:id", getSingleCourse)
router.get("/lectures/:id", isAuth, fetchLectures)
router.get("/lecture/:id", isAuth, fetchLecture)
router.get("/myCourse" , isAuth, getMyCourses)
router.post("/course/checkout/:id", isAuth, checkout);
// router.post("/payment/:id", async (req, res) => {
//     try {
//       // Retrieve the user and course
//       const user = await User.findById(req.user._id);
//       console.log("user", user);
//       console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
//       const course = await Courses.findById(req.params.id);
//       console.log("user",req.params.id);
      
  
//       if (!course) {
//         return res.status(404).json({ message: "Course not found" });
//       }
  
  
//       if (user.subscription.includes(course._id)) {
//         return res.status(400).json({ message: "You already have this course" });
//       }
  
//       // Create Stripe Checkout session
      
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'inr',
//               product_data: {
//                 name: course.title,
//               },
//               unit_amount: Math.round(course.price * 100), // Amount in smallest currency unit
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `http://localhost:5173/payment-success/${course._id}`, // Replace with your success URL
//         cancel_url: `http://localhost:5173/course/${course._id}`, // Replace with your cancel URL
//       });
  
      
  
//       // Respond with the session ID
//       res.status(200).json({ id: session.id });
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });


export default router;