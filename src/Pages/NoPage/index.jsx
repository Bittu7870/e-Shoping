import React from 'react';
import Layout from '../../Components/Layout';

const NoPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops, Page Not Found!
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default NoPage;
