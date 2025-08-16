-- Drop existing insert policy if exists
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

-- Create new insert policy for orders
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
TO public
WITH CHECK (true);