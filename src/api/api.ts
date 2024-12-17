import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const getLessons = () => {
    return useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const { data: lessons, error } = await supabase.from('lessons').select('*').order('sequence', { ascending: true });
            if (error) throw new Error('An error occured while fetching lessons');

            return { lessons };
        }
    })
}