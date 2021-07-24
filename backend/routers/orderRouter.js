import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  mailgun,
  payOrderEmailTemplate,
} from "../utils.js";

const orderRouter = express.Router();

/* ==> ( Order List ) <== API */
orderRouter.get(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    // console.log("Seller Query:", seller); //! info.
    const sellerFilter = seller ? { seller } : {};
    const orders = await Order.find({ ...sellerFilter }).populate(
      "user",
      "name"
    );
    res.send(orders);
  })
);

/* ==> ( Order Mine ) <== API */
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    /* ==> ( orders ) <==
    ? Get ( orders ) for current USER by Id.
    * Fun: find( ) run with promise set await.
    TODO: Learn find( USER request Id )
    */
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

/* ==> ( Create Order ) <== API
? Middleware ( isAuth ) usage in:
*  Order Model Field: ( user: req.user._id ).
*/
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

/* ==> ( Order Details ) <== API
? Middleware ( isAuth ):
?  Only authenticated users can see ( Order Screen ).
*/
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    /*
    ? Get ( order ) from data collection by ( Id )
    ?  using mongoose method ==> findById( Parameter Id ).
    */
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

/* ==> ( Pay Order ) <== API */
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //? ==> Get ( order model by ID ) to complete pay.
    const order = await Order.findById(req.params.id).populate(
      "user",
      "email name"
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      //* ==> Payment information by ( Method ).
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      //? ==> Changing old ( Order Data ) with new information.
      const updatedOrder = await order.save();
      mailgun()
        .messages()
        .send(
          {
            from: `Magazine <magazine@sample.com>`,
            to: `${order.user.name} <${order.user.email}>`,
            subject: `Magazine ${order._id.toString().substring(0, 8)}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(`mailgun:`, error);
            } else {
              console.log(`mailgun:`, body);
            }
          }
        );
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

/* ==> ( Delete Order ) <== API */
orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: "Order Deleted", order: deleteOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

/* ==> ( Deliver Order ) <== API */
orderRouter.put(
  "/:id/deliver",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
