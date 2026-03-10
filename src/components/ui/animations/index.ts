/**
 * MUNET Animation Components
 * 
 * This module exports all animation-related components and utilities.
 * Based on PRD Section 7.2 (Motion Design):
 * - Subtle parallax on scroll
 * - Card hover states with elevation changes
 * - Page transitions (fade/slide)
 * - Loading states with energy-themed animations
 */

// Page Transitions
export { default as PageTransition, PageTransitionReduced } from '@/components/layout/PageTransition'

// Motion Components
export {
  FadeIn,
  FadeInStagger,
  StaggerItem,
  ScaleIn,
  SlideIn,
  HoverCard,
  HoverImage,
  Parallax,
  // Animation variants for custom use
  fadeInUpVariants,
  fadeInVariants,
  scaleInVariants,
  slideInLeftVariants,
  slideInRightVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '@/components/ui/motion'

// Loading Animations
export {
  EnergyLoader,
  SkeletonPulse,
  SkeletonCard,
  SkeletonText,
  PageLoader,
  ButtonSpinner,
  LoadingDots,
  CheckmarkAnimation,
  Spinner,
} from '@/components/ui/loading'

// Animated Button
export { AnimatedButton, RippleButton } from '@/components/ui/animated-button'

// Animated Accordion
export {
  AnimatedAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
} from '@/components/ui/animated-accordion'

// Modal
export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal'

// Toast
export {
  ToastProvider,
  useToast,
  useToastActions,
} from '@/components/ui/toast'

// Scroll Animation Hook
export { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation'
