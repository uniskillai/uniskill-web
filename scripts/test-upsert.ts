
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpsert() {
    console.log("Testing upsert with extra fields...");
    const { error } = await supabase.from('skills').upsert({
        skill_name: 'test_sync_logic',
        emoji: '🧪',
        description: 'Test description',
        gradient_from: 'from-blue-500',
        gradient_to: 'to-purple-500'
    }, { onConflict: 'skill_name' });

    if (error) {
        console.log("Upsert failed (as expected if columns are missing):", error.message);
    } else {
        console.log("Upsert succeeded! This means the columns ALREADY EXIST.");
    }
}

testUpsert();
