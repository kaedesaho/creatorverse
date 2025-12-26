import { createClient } from '@supabase/supabase-js';

const URL = 'https://jnxbkmkqxwphtcymrssh.supabase.co';
const API_KEY = 'sb_publishable_ZHowFshuOHzwe9bKyG-R4Q_dsRdbFrr';

export const supabase = createClient(URL, API_KEY);