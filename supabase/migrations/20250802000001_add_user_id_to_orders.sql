-- Add user_id column to orders table
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Update RLS policies for orders
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create new policies
-- Not creating insert policy here as it's already defined in 20250802000000_fix_orders_insert_policy.sql

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  -- Allow admins to view all orders
  is_admin(auth.uid()) OR 
  -- Allow users to view their own orders
  (auth.uid() = user_id) OR
  -- Allow users to view orders with null user_id (guest orders)
  (user_id IS NULL)
);