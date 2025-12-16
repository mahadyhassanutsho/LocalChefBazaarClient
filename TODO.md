# todo.md

## MARKERS

- 🔘 TODO
- ✔️ DONE

## GLOBAL REQUIREMENTS

- ✔️ Add README (project name, purpose, live URL, key features, packages)
- ✔️ Secure Firebase keys in .env
- ✔️ Secure MongoDB credentials in .env
- ✔️ Maintain clean design (spacing, alignment, contrast)
- ✔️ Minimum 20 client commits
- ✔️ Minimum 12 server commits
- ✔️ Ensure no CORS / 404 / 504 errors in production
- ✔️ No route reload issues
- ✔️ Add domain to Firebase auth
- ✔️ Private routes must persist login after reload

## PUBLIC PAGES

## HOME PAGE

- ✔️ Animated Hero / Banner
- ✔️ Show 6 daily meals (dynamic)
- 🔘 Show customer reviews
- ✔️ Add an extra custom section

## MEALS PAGE

- ✔️ Display all meals (cards)
- ✔️ Show chef name + ID, image, price, rating, delivery area
- ✔️ Add sort by price (ascending/descending)
- ✔️ See Details → redirect to login if user not logged in

## AUTHENTICATION

## REGISTRATION

- ✔️ Fields: Email, Name, Image, Address, Password, Confirm Password
- ✔️ Default role: user
- ✔️ Default status: active
- ✔️ Use Firebase email+password auth

## LOGIN

- ✔️ Email + Password login
- ✔️ Link between Login ↔ Register

## PRIVATE PAGES

## MEAL DETAILS PAGE

- ✔️ Show full meal info
- ✔️ Show ingredients, delivery time, chef experience, chef ID
- ✔️ Order Now → goes to Order Page
- ✔️ Reviews section (view reviews)
- ✔️ Add review (save instantly)
- ✔️ Add to favorites (no duplicates)

## ORDER PAGE

- ✔️ Auto-fill mealName, price, chefId, userEmail
- ✔️ User inputs quantity + address
- ✔️ orderStatus = pending
- ✔️ Save to MongoDB
- ✔️ Show total price before confirming

## DASHBOARD PAGES

## USER DASHBOARD

### My Profile

- ✔️ Show name, email, image, address, role, status, chefId
- ✔️ Buttons: Be a Chef, Be an Admin
- ✔️ Send request to admin for role change

### My Orders

- ✔️ Show food name, price, quantity, chef info, status
- ✔️ Show paymentStatus
- ✔️ Pay button only if accepted and pending
- ✔️ Stripe payment → update paymentStatus = paid
- ✔️ Save payment history
- ✔️ Payment success page

### My Reviews

- ✔️ Show meal name, rating, comment, date
- ✔️ Update review (modal)
- ✔️ Delete review

### Favorite Meals

- ✔️ List favorites (name, chef, price, date)
- ✔️ Delete favorite

## CHEF DASHBOARD

### Create Meal

- ✔️ Fields: food name, chef name, image upload, price, rating,
    ingredients, delivery time, experience, chefId, userEmail
- ✔️ Save to meals collection

### My Meals

- ✔️ Show all meals created by chef
- ✔️ Update meal
- ✔️ Delete meal

### Order Requests

- ✔️ Show pending orders (food, price, quantity, user, date)
- ✔️ Cancel → cancelled
- ✔️ Accept → accepted
- ✔️ Deliver → delivered
- ✔️ Disable buttons based on orderStatus

## ADMIN DASHBOARD

- ✔️ Manage users
- ✔️ Manage role requests (chef/admin)
- ✔️ View platform stats

## BACKEND COLLECTIONS

- ✔️ meals
- ✔️ reviews
- ✔️ favorites
- ✔️ orders
- ✔️ roleRequests
- ✔️ payments
