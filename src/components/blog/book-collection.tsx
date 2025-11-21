'use client';

import { BookOpen, Bookmark, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Book {
  title: string;
  author: string;
  status?: 'wishlist' | 'reading' | 'completed';
  category?: string;
}

interface BookCollectionProps {
  books: Book[];
}

export function BookCollection({ books }: BookCollectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'reading':
        return <BookOpen className="h-4 w-4" />;
      case 'completed':
        return <Bookmark className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'reading':
        return 'from-blue-500 to-blue-600';
      case 'completed':
        return 'from-green-500 to-green-600';
      default:
        return 'from-amber-500 to-amber-600';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'reading':
        return 'Currently Reading';
      case 'completed':
        return 'Completed';
      default:
        return 'Wishlist';
    }
  };

  return (
    <div className="not-prose my-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="p-6">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${getStatusColor(book.status)} text-white shadow-md`}>
                  {getStatusIcon(book.status)}
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  {getStatusText(book.status)}
                </span>
              </div>
              
              <h3 className="mb-2 text-lg font-bold leading-tight text-neutral-900 dark:text-neutral-100">
                {book.title}
              </h3>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                by {book.author}
              </p>
              
              {book.category && (
                <div className="mt-3">
                  <span className="inline-block rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {book.category}
                  </span>
                </div>
              )}
            </div>
            
            <motion.div
              className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${getStatusColor(book.status)}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

