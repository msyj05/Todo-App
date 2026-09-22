import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aoyrtmnaieqsyopmybfn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveXJ0bW5haWVxc3lvcG15YmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4OTU0MzAsImV4cCI6MjEwNDQ3MTQzMH0.-tIdijIYiPSvL-tHvYHHokcuyBU0CBPLgcvUuL--x4I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
