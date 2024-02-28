# RentHub

https://rentavehiclehub.netlify.app/

## Overview

RenHub is a full stack web application designed to streamline the process of vehicle rental and booking. With an intuitive user interface, users can explore a diverse fleet of vehicles, view detailed information including pricing, fuel type, gear type, and seating capacity, and seamlessly initiate the booking process. 
RenHub also incorporates dynamic filtering, enabling users to refine their vehicle search based on specific criteria.
The booking process is user-centric, guiding individuals to provide essential contact details for a smooth transaction. 
The project prioritizes a responsive design, ensuring optimal user experience across different devices. Additionally, the implementation of loading animations enhances user engagement during data fetching.

## Features

### Vehicle Selection

Users can view a diverse range of vehicles available for rent. Vehicle details include images, names, pricing, fuel type, gear type, seating capacity, and luggage space.

### Location Exploration

Users can explore different rental locations. Each location is represented with an image and an identifier.

### Booking Process

Users can initiate the booking process by selecting a vehicle. They provide essential contact details such as name, phone number, email, and pickup time.

### Dynamic Filtering

Users can filter vehicles based on various criteria, such as vehicle type, transmission, fuel type, passenger capacity, and price.

### Responsive Design

The application is designed to be responsive, providing a seamless experience across different devices and screen sizes.

### Search Engine Optimization (SEO)

Routes and pages are optimized for search engines to enhance the project's visibility online.

### Loading Animation

A loading animation is implemented to improve user experience during data fetching.

## Code Structure

The project uses React for building the user interface. Code is organized into components, promoting reusability and maintainability. State management is achieved using React's useState and useEffect hooks.

### API Integration

Axios is used to make HTTP requests to a server, fetching and displaying data dynamically.

### React Router

React Router is employed for client-side routing, allowing seamless navigation between different views and pages without full-page reloads. Dynamic routing is utilized to display specific details for locations, vehicles, and booking pages.

### Effect Hook

The useEffect hook is utilized for asynchronous operations, such as fetching data from the server using Axios. It is employed for handling loading states, error handling, and triggering navigation upon certain events.

### Dynamic Content Rendering

Dynamic content rendering is achieved by mapping over arrays of data to display lists of locations, vehicles, and features.

### Modal Component

Modals are employed for a smooth and intuitive user experience during the booking process.

### Form Handling

Forms are used to collect and handle user input for contact details and payment information during the booking process. Form data is managed using the useState hook, and form submissions trigger asynchronous operations using Axios.

### Error Handling

The application incorporates error handling to gracefully manage unexpected situations, providing informative error messages.

