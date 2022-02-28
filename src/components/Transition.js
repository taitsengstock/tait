import React from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from '@reach/router'

const Transition = ({ children }) => {
	const location = useLocation()
	return (
		<AnimatePresence exitBeforeEnter>
			<div key={location.pathname}>
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.6 }}
				>
					{children}
				</motion.div>
			</div>
		</AnimatePresence>
	)
}

Transition.propTypes = {
	children: PropTypes.node,
}

export default Transition
