-- Create custom types
CREATE TYPE public.app_role AS ENUM ('admin', 'volunteer', 'senior');
CREATE TYPE public.task_status AS ENUM ('pending', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.task_type AS ENUM ('grocery', 'medical', 'transport', 'companion', 'household', 'other');
CREATE TYPE public.task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.donation_type AS ENUM ('financial', 'items');
CREATE TYPE public.donation_status AS ENUM ('pending', 'approved', 'received', 'cancelled');
CREATE TYPE public.event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE public.message_type AS ENUM ('text', 'image', 'video', 'location');
CREATE TYPE public.alert_status AS ENUM ('active', 'resolved', 'cancelled');
CREATE TYPE public.transport_mode AS ENUM ('walking', 'car', 'bike', 'bus');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  address TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create volunteer_profiles table
CREATE TABLE public.volunteer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  skills TEXT[],
  availability TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  total_tasks INTEGER DEFAULT 0,
  active_tasks INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  badges TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;

-- Create senior_profiles table
CREATE TABLE public.senior_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  medical_conditions TEXT,
  mobility_level TEXT,
  preferred_volunteer_id UUID REFERENCES public.volunteer_profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.senior_profiles ENABLE ROW LEVEL SECURITY;

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID REFERENCES public.senior_profiles(user_id) ON DELETE CASCADE NOT NULL,
  volunteer_id UUID REFERENCES public.volunteer_profiles(user_id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  task_type task_type NOT NULL,
  status task_status NOT NULL DEFAULT 'pending',
  priority task_priority NOT NULL DEFAULT 'medium',
  scheduled_date TIMESTAMPTZ,
  completed_date TIMESTAMPTZ,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message_type message_type NOT NULL DEFAULT 'text',
  content TEXT NOT NULL,
  image_url TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status event_status NOT NULL DEFAULT 'upcoming',
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create event_participants table
CREATE TABLE public.event_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;

-- Create donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID REFERENCES public.senior_profiles(user_id) ON DELETE CASCADE NOT NULL,
  donor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  donation_type donation_type NOT NULL,
  status donation_status NOT NULL DEFAULT 'pending',
  target_amount DECIMAL(10,2),
  current_amount DECIMAL(10,2) DEFAULT 0,
  items TEXT[],
  urgency TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create emergency_alerts table
CREATE TABLE public.emergency_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID REFERENCES public.senior_profiles(user_id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL,
  message TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  status alert_status NOT NULL DEFAULT 'active',
  responded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;

-- Create location_tracking table
CREATE TABLE public.location_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  volunteer_id UUID REFERENCES public.volunteer_profiles(user_id) ON DELETE CASCADE NOT NULL,
  senior_id UUID REFERENCES public.senior_profiles(user_id) ON DELETE CASCADE NOT NULL,
  current_lat DECIMAL(10,8),
  current_lng DECIMAL(11,8),
  destination_lat DECIMAL(10,8),
  destination_lng DECIMAL(11,8),
  transport_mode transport_mode,
  eta_minutes INTEGER,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.location_tracking ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_volunteer_profiles_updated_at BEFORE UPDATE ON public.volunteer_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_senior_profiles_updated_at BEFORE UPDATE ON public.senior_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for volunteer_profiles
CREATE POLICY "Anyone can view volunteer profiles" ON public.volunteer_profiles FOR SELECT USING (true);
CREATE POLICY "Volunteers can update own profile" ON public.volunteer_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Volunteers can insert own profile" ON public.volunteer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage volunteer profiles" ON public.volunteer_profiles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for senior_profiles
CREATE POLICY "Anyone can view senior profiles" ON public.senior_profiles FOR SELECT USING (true);
CREATE POLICY "Seniors can update own profile" ON public.senior_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Seniors can insert own profile" ON public.senior_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage senior profiles" ON public.senior_profiles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for tasks
CREATE POLICY "Anyone can view tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Seniors can create tasks" ON public.tasks FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'senior') AND auth.uid() = senior_id);
CREATE POLICY "Seniors can update own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = senior_id);
CREATE POLICY "Volunteers can update assigned tasks" ON public.tasks FOR UPDATE USING (auth.uid() = volunteer_id);
CREATE POLICY "Admins can manage all tasks" ON public.tasks FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for messages
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Recipients can update messages" ON public.messages FOR UPDATE USING (auth.uid() = recipient_id);
CREATE POLICY "Admins can view all messages" ON public.messages FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for events
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins can manage events" ON public.events FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for event_participants
CREATE POLICY "Anyone can view event participants" ON public.event_participants FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON public.event_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unregister from events" ON public.event_participants FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for donations
CREATE POLICY "Anyone can view donations" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Seniors can create donations" ON public.donations FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'senior') AND auth.uid() = senior_id);
CREATE POLICY "Seniors can update own donations" ON public.donations FOR UPDATE USING (auth.uid() = senior_id);
CREATE POLICY "Donors can update donations" ON public.donations FOR UPDATE USING (auth.uid() = donor_id);
CREATE POLICY "Admins can manage donations" ON public.donations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for emergency_alerts
CREATE POLICY "Anyone can view emergency alerts" ON public.emergency_alerts FOR SELECT USING (true);
CREATE POLICY "Seniors can create alerts" ON public.emergency_alerts FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'senior') AND auth.uid() = senior_id);
CREATE POLICY "Volunteers can respond to alerts" ON public.emergency_alerts FOR UPDATE USING (public.has_role(auth.uid(), 'volunteer'));
CREATE POLICY "Admins can manage alerts" ON public.emergency_alerts FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for location_tracking
CREATE POLICY "Seniors can view own tracking" ON public.location_tracking FOR SELECT USING (auth.uid() = senior_id);
CREATE POLICY "Volunteers can view own tracking" ON public.location_tracking FOR SELECT USING (auth.uid() = volunteer_id);
CREATE POLICY "Volunteers can create tracking" ON public.location_tracking FOR INSERT WITH CHECK (auth.uid() = volunteer_id);
CREATE POLICY "Volunteers can update own tracking" ON public.location_tracking FOR UPDATE USING (auth.uid() = volunteer_id);
CREATE POLICY "Admins can view all tracking" ON public.location_tracking FOR SELECT USING (public.has_role(auth.uid(), 'admin'));