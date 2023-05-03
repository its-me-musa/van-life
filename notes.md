
1. What is a route/url parameter?
A portion of our route path that is a placeholder for what will eventually
be the actual segment in the URL of the page.

------------
2. Add a route parameter called `productId` to the Route path below:


<Route path="/products/:productId" element={<ProductDetail />} />


------------
3. Add whatever you need to add for the component below to display
   the route parameter in the <h1>

import { useParams } from 'react-router-dom'

function ProductDetail() {
    const { productId } = useParams()
    return <h1>Product id is {productId}</h1>
}


1. What is the primary reason to use a nested route?
    avoid repetition
    Whenever we have some shared UI between routes in our app.

2. What is a "Layout Route"?
It's the parent route of some nested routes that contains just
the portion of the UI that will be shared. It will use an Outlet
component.

3. What does the <Outlet /> component do? When do you use it?
We use it anytime we have a parent Route that's wrapping 
children routes. It renders the matching child route's
`element` prop given in its route definition


4. What is an "Index Route"?
It's the "default route" we want to render when the path
of the parent route matches. It gives us a chance to render
an element inside the parent's <Outlet /> at the same path
as the parent route.