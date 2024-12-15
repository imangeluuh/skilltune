import { StyleSheet, Text, View } from "react-native";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthData = {
  session: Session | null;
  user: any;
  mounting: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  user: null,
  mounting: true,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);
  const [mounting, setMounting] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      console.log("1st session", session);
      if (session) {
        // const { data: user, error } = await supabase
        //   .from("users")
        //   .select("*")
        //   .eq("email", session.user.email)
        //   .single();

        if (error) {
          console.error("error", error);
        } else {
          setUser(user);
        }
      }

      setMounting(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, mounting }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
