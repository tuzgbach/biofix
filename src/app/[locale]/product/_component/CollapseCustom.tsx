import React, { useEffect, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowForward } from 'react-icons/io'

interface CollapseCustomProps {
    children: ReactNode
    header: ReactNode
    selected?: boolean
    onClickHeader?: () => void
}

const CollapseCustom: React.FC<CollapseCustomProps> = ({
    children,
    header,
    selected = false,
    onClickHeader,
}) => {
    const [toggle, setToggle] = useState<boolean>(selected)

    useEffect(() => {
        setToggle(selected)
    }, [selected])

    return (
        <div className="relative rounded-xl shadow-lg border-1 overflow-hidden">
            <motion.div
                className="flex justify-between items-center cursor-pointer p-4"
                onClick={() => {
                    setToggle(!toggle)
                    onClickHeader && onClickHeader()
                }}
                style={{
                    background: 'linear-gradient(90deg, #075985 50%, #ffffff 50%)',
                    backgroundSize: '200% 100%',
                    backgroundPositionX: toggle ? '0%' : '100%',
                    color: toggle ? '#fff' : '#000',
                }}
                animate={{ backgroundPositionX: toggle ? '0%' : '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <span>{header}</span>
                <motion.span
                    initial={false}
                    animate={{ rotate: toggle ? 90 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    <IoIosArrowForward />
                </motion.span>
            </motion.div>
            <AnimatePresence>
                {toggle && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CollapseCustom
