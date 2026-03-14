
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log("Checking skills table schema...");
    const { data, error } = await supabase.from('skills').select('*').limit(1);
    
    if (error) {
        console.error("Error:", error);
        return;
    }
    
    if (data && data.length > 0) {
        console.log("Available columns in 'skills' table:");
        console.log(Object.keys(data[0]));
    } else {
        console.log("No data found in 'skills' table.");
    }
}

checkSchema();
