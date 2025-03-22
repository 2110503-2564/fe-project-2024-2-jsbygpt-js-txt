'use client';

import Image from "next/image";
import Banner from "@/components/Banner";
import Link from 'next/link';
import Providers from '@/components/Providers';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Experience Luxury in Motion
          </h1>
          <p className="hero-description">
            Drive the finest luxury vehicles. From elegant sedans to powerful sports cars, 
            discover your perfect ride with our premium rental service.
          </p>
          <div className="hero-buttons">
            {currentUser ? (
              <Link href="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/register" className="btn-primary">
                  Start Your Journey
                </Link>
                <Link href="/login" className="btn-outline">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container-base">
          <h2 className="features-title">Why Choose Us?</h2>
          <div className="features-grid">
            {/* Premium Vehicles Card */}
            <div className="feature-card">
              <div className="feature-card-icon">🚗</div>
              <h3 className="feature-card-title">Premium Vehicles</h3>
              <p className="feature-card-text">
                Choose from our extensive fleet of luxury vehicles from top manufacturers.
              </p>
            </div>

            {/* Full Insurance Card */}
            <div className="feature-card">
              <div className="feature-card-icon">🛡️</div>
              <h3 className="feature-card-title">Full Insurance</h3>
              <p className="feature-card-text">
                All our rentals come with comprehensive insurance coverage for your peace of mind.
              </p>
            </div>

            {/* 24/7 Support Card */}
            <div className="feature-card">
              <div className="feature-card-icon">🎧</div>
              <h3 className="feature-card-title">24/7 Support</h3>
              <p className="feature-card-text">
                Our customer service team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
