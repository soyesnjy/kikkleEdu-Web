import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from './animations';

const Page = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default Page;
