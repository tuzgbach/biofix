import { FC, memo, useEffect, useRef, useState } from 'react'
import { Button } from '@nextui-org/react'
import { BiMessage } from 'react-icons/bi'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import PropTypes from 'prop-types'

interface LikeShareProps {
    className?: string
    commentId?: string
    linkShare: string
    type?: 'row' | 'col'
}

const Row: FC<LikeShareProps> = ({ className: cl, commentId, linkShare }) => {
    const [isSticky, setSticky] = useState(false)
    const likeShareRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const checkScrollTop = () => {
        if (!likeShareRef.current || !parentRef.current) return
        const parentTop = parentRef.current.offsetTop
        const parentBottom = parentTop + parentRef.current.offsetHeight
        const scrollPosition = window.scrollY
        setSticky(scrollPosition >= parentTop - 200 && scrollPosition <= parentBottom - 600)
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => window.removeEventListener('scroll', checkScrollTop)
    }, [])

    return (
        <div className={cl} ref={parentRef} style={{ position: 'relative' }}>
            <div
                ref={likeShareRef}
                className={isSticky ? 'fixed mt-[250px]' : 'absolute mt-[250px]'}
                style={{ transition: 'opacity 0.5s ease-in-out' }}
            >
                <div className={'flex flex-col space-y-2'}>
                    <Button
                        className="fb-share-button rounded-full border-1 hover:bg-[#3b5999] group bg-white"
                        data-href={linkShare}
                        size="sm"
                        isIconOnly
                        onClick={() =>
                            window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${linkShare}`,
                                '_blank',
                                'width=600,height=400'
                            )
                        }
                    >
                        <FaFacebookF size={16} className="group-hover:text-white" />
                    </Button>
                    <Button
                        size="sm"
                        isIconOnly
                        className="rounded-full border-1 hover:bg-[#55acee] group bg-white"
                        onClick={() =>
                            window.open(
                                `https://twitter.com/intent/tweet?url=${linkShare}`,
                                '_blank',
                                'width=600,height=400'
                            )
                        }
                    >
                        <FaTwitter size={16} className="group-hover:text-white" />
                    </Button>
                    <Button
                        size="sm"
                        isIconOnly
                        className="rounded-full border-1 hover:bg-[#0a66c2] group bg-white"
                        onClick={() =>
                            window.open(
                                `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${linkShare}`,
                                '_blank',
                                'width=600,height=400'
                            )
                        }
                    >
                        <FaLinkedinIn size={16} className="group-hover:text-white" />
                    </Button>
                    <Button
                        size="sm"
                        isIconOnly
                        className="rounded-full border-1 hover:bg-[#0a66c2] group bg-white"
                        onClick={() =>
                            document
                                .getElementById(commentId || 'comment')
                                ?.scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        <BiMessage size={16} className="group-hover:text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const Col: FC<LikeShareProps> = ({ className: cl, linkShare }) => {
    return (
        <div className={cl}>
            <div className={'flex space-x-2'}>
                <Button
                    className="rounded-full border-1 hover:bg-[#3b5999] group/c bg-white "
                    data-href={linkShare}
                    size="sm"
                    isIconOnly
                    onClick={() =>
                        window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${linkShare}`,
                            '_blank',
                            'width=600,height=400'
                        )
                    }
                >
                    <FaFacebookF size={16} className="group-hover/c:text-white z-10" />
                </Button>
                <Button
                    size="sm"
                    isIconOnly
                    className="rounded-full border-1 hover:bg-[#55acee] group/c bg-white"
                    onClick={() =>
                        window.open(
                            `https://twitter.com/intent/tweet?url=${linkShare}`,
                            '_blank',
                            'width=600,height=400'
                        )
                    }
                >
                    <FaTwitter size={16} className="group-hover/c:text-white" />
                </Button>
                <Button
                    size="sm"
                    isIconOnly
                    className="rounded-full border-1 hover:bg-[#0a66c2] group/c bg-white"
                    onClick={() =>
                        window.open(
                            `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${linkShare}`,
                            '_blank',
                            'width=600,height=400'
                        )
                    }
                >
                    <FaLinkedinIn size={16} className="group-hover/c:text-white" />
                </Button>
            </div>
        </div>
    )
}

const typeValue = { row: Row, col: Col }

const LikeShare: FC<LikeShareProps> = ({ className: cl, commentId, linkShare, type = 'row' }) => {
    const Component = typeValue[type]
    return <Component className={cl} commentId={commentId} linkShare={linkShare} />
}

LikeShare.propTypes = {
    className: PropTypes.string,
    commentId: PropTypes.string,
    linkShare: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['row', 'col']),
}

Row.propTypes = {
    className: PropTypes.string,
    commentId: PropTypes.string,
    linkShare: PropTypes.string.isRequired,
}

Col.propTypes = {
    className: PropTypes.string,
    commentId: PropTypes.string,
    linkShare: PropTypes.string.isRequired,
}

export default memo(LikeShare)
