import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfrdebyrwcerxqhvqwgr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmRlYnlyd2NlcnhxaHZxd2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTk5NDYsImV4cCI6MjA2MDQ5NTk0Nn0.0fHzi1LByCC_VRxyXNLt_g5_2D-DjvqMk6XTMZxYYP0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
