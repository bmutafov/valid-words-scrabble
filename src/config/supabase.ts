import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wusvlzkzjdjqydjggjcw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1c3Zsemt6amRqcXlkamdnamN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1ODY3OTgsImV4cCI6MjAwMDE2Mjc5OH0.R-5AxI7m0Na3EuPM6ugGB8tgXndF3LUHUegasCP_l5U';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
