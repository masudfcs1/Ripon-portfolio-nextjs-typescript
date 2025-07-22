import React from 'react'

export default function Footer() {
  return (
      <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} Ripon Hasan. All rights reserved.</p>
                <p className="text-gray-500 text-sm mt-1">
                   Designed & Developed with passion
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <button className="hover:text-white transition-colors">Privacy Policy</button>
                <button className="hover:text-white transition-colors">Terms of Service</button>
                <button className="hover:text-white transition-colors">Sitemap</button>
              </div>
            </div>
          </div>
  )
}
