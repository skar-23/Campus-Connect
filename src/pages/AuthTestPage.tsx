import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const AuthTestPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Auth Status:</h2>
          
          {user ? (
            <div className="text-green-600">
              <p>✅ User is authenticated!</p>
              <div className="mt-4 space-y-2">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role || "No role set"}</p>
                <p><strong>Created:</strong> {user.created_at}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold">User Metadata:</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(user.user_metadata, null, 2)}
                </pre>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold">App Metadata:</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(user.app_metadata, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-red-600">
              <p>❌ No user authenticated</p>
              <p className="mt-2">You need to log in first.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTestPage;