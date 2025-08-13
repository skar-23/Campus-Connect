import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * Debug component to test senior profile data fetching
 * Add this temporarily to any page to debug the issue
 */
export const SeniorProfileTest: React.FC = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    if (user?.id) {
      runTests();
    }
  }, [user]);

  const runTests = async () => {
    const results: any = {};

    // Test 1: Check user info
    results.user = {
      id: user?.id,
      email: user?.email,
      metadata: user?.user_metadata
    };

    // Test 2: Check raw database query
    try {
      const { data, error } = await supabase
        .from('seniors')
        .select('*')
        .eq('id', user!.id)
        .single();
      
      results.directQuery = { data, error };
    } catch (err) {
      results.directQuery = { error: err };
    }

    // Test 3: Check if any senior exists with this email
    try {
      const { data, error } = await supabase
        .from('seniors')
        .select('*')
        .eq('email', user!.email!)
        .single();
      
      results.emailQuery = { data, error };
    } catch (err) {
      results.emailQuery = { error: err };
    }

    // Test 4: Check table structure
    try {
      const { data, error } = await supabase
        .from('seniors')
        .select('*')
        .limit(1);
      
      results.tableCheck = { 
        hasData: data && data.length > 0, 
        columns: data?.[0] ? Object.keys(data[0]) : [],
        error 
      };
    } catch (err) {
      results.tableCheck = { error: err };
    }

    console.log('🧪 Senior Profile Debug Results:', results);
    setTestResults(results);
  };

  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'white',
      border: '2px solid #ccc',
      padding: '20px',
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <h3>🧪 Senior Profile Debug</h3>
      <pre>{JSON.stringify(testResults, null, 2)}</pre>
    </div>
  );
};

export default SeniorProfileTest;
