import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CleverCommerce.css'
import logoIcon from '../../assets/clever-commerce-logo.svg'

// Reusable container component for consistent width
const ContentContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`cc-content-container ${className}`}>
      {children}
    </div>
  )
}

interface Product {
    id: string
    name: string
    productCode: string
    price: number
    quantity: number
    image: string
    available: boolean
}

interface Service {
    id: string
    name: string
    price: number
    elitePrice: number
    selected: boolean
    description?: string
    image?: string
    details?: string[]
}

const CleverCommerce = () => {
    const recommendedCarouselRef = useRef<HTMLDivElement>(null)
    const sellerCarouselRef = useRef<HTMLDivElement>(null)
    const [productIdCounter, setProductIdCounter] = useState(100)

    // Format price with commas for numbers >= 1000
    const formatPrice = (price: number): string => {
        const formatted = price.toFixed(2)
        if (price >= 1000) {
            const parts = formatted.split('.')
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return parts.join('.')
        }
        return formatted
    }
    const [recommendedScrollState, setRecommendedScrollState] = useState({ canScrollLeft: false, canScrollRight: true })
    const [sellerScrollState, setSellerScrollState] = useState({ canScrollLeft: false, canScrollRight: true })
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            name: 'Finish Powerball Automatic Dishwasher Detergent, All in 1 Ultra Powerful Clean, 2.4 KG - 140 Tabs',
            productCode: '1234567',
            price: 24.99,
            quantity: 2,
            image: 'https://www.finish.pl/static/9681c2c6f4da6db4859dcc0fdc870ad9/623b2/pl-PL-finish_ultimate_plus_lemon_45_pl_5908252010998_3279034_front_hi_res.webp',
            available: true
        },
        {
            id: '2',
            name: 'SAMSUNG QE55QN77F 55" QD-Mini LED 4K Mini LED 144Hz Tizen TV HDMI 2.1 Television',
            productCode: '1234567',
            price: 3099.00,
            quantity: 1,
                image: 'https://images.samsung.com/is/image/samsung/p6pim/pl/qe65q7faauxxh/gallery/pl-qled-q7-561726-qe65q7faauxxh-548648523?$Q90_1368_1094_F_JPG$',
                available: true
        }
    ])

    const [services, setServices] = useState<Service[]>([
        {
            id: '1',
            name: 'SmartStart Calibration',
            price: 299.99,
            elitePrice: 149.99,
            selected: false,
            description: 'Professional calibration service to optimize your TV\'s picture and sound quality. Our certified technicians will fine-tune all settings for the best viewing experience.',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
            details: [
                'Color accuracy optimization',
                'Sound system calibration',
                'Motion settings adjustment',
                'HDR and brightness tuning',
                'Certified technician service',
                '1-year warranty on calibration'
            ]
        },
        {
            id: '2',
            name: 'PixelGuard Protection',
            price: 59.99,
            elitePrice: 24.99,
            selected: false,
            description: 'Comprehensive protection plan covering screen damage, pixel defects, and hardware malfunctions. Peace of mind for your investment with 24/7 support.',
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
            details: [
                'Screen damage protection',
                'Pixel defect coverage',
                'Hardware malfunction coverage',
                '24/7 customer support',
                'Fast replacement service',
                'Valid for 2 years'
            ]
        },
        {
            id: '3',
            name: 'ProMount & Install',
            price: 40.99,
            elitePrice: 40.99,
            selected: false,
            description: 'Expert installation and wall mounting service. Our professionals will safely mount your TV and ensure everything is properly connected and configured.',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            details: [
                'Professional wall mounting',
                'Cable management',
                'Device connection setup',
                'Safety inspection',
                'Same-day service available',
                'Satisfaction guaranteed'
            ]
        }
    ])

    const [hasElite, setHasElite] = useState(false)
    const [showEliteModal, setShowEliteModal] = useState(false)
    const [showElitePromoModal, setShowElitePromoModal] = useState(false)
    const [showShareMenu, setShowShareMenu] = useState(false)
    const [showRemoveAllConfirm, setShowRemoveAllConfirm] = useState(false)
    const [showSellerDrawer, setShowSellerDrawer] = useState(false)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [removedProduct, setRemovedProduct] = useState<Product | null>(null)
    const [showEliteRemovedSnackbar, setShowEliteRemovedSnackbar] = useState(false)
    const [showBenefitsDrawer, setShowBenefitsDrawer] = useState(false)
    const [showServiceDetailsDrawer, setShowServiceDetailsDrawer] = useState(false)
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
    const [serviceSnackbar, setServiceSnackbar] = useState({ show: false, message: '', serviceName: '' })

    const updateQuantity = (productId: string, delta: number) => {
        setProducts(products.map(p =>
            p.id === productId
                ? { ...p, quantity: Math.max(1, p.quantity + delta) }
                : p
        ))
    }

    const removeProduct = (productId: string) => {
        const productToRemove = products.find(p => p.id === productId)
        if (productToRemove) {
            setRemovedProduct(productToRemove)
            setProducts(products.filter(p => p.id !== productId))
            setShowSnackbar(true)
            setTimeout(() => {
                setShowSnackbar(false)
                setRemovedProduct(null)
            }, 5000)
        }
    }

    const undoRemoveProduct = () => {
        if (removedProduct) {
            setProducts([...products, removedProduct])
            setShowSnackbar(false)
            setRemovedProduct(null)
        }
    }

    const removeAllProducts = () => {
        setShowRemoveAllConfirm(true)
    }

    const confirmRemoveAll = () => {
        setProducts([])
        setShowRemoveAllConfirm(false)
    }

    const toggleService = (serviceId: string) => {
        const service = services.find(s => s.id === serviceId)
        if (service) {
            const wasSelected = service.selected
            setServices(services.map(s =>
                s.id === serviceId ? { ...s, selected: !s.selected } : s
            ))
            setServiceSnackbar({
                show: true,
                message: !wasSelected ? 'Service added to cart' : 'Service removed from cart',
                serviceName: service.name
            })
            setTimeout(() => {
                setServiceSnackbar({ show: false, message: '', serviceName: '' })
            }, 3000)
        }
    }

    const calculateProductValue = () => {
        return products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
    }

    const calculateServiceValue = () => {
        return services
            .filter(s => s.selected)
            .reduce((sum, s) => sum + s.price, 0)
    }

    const calculateEliteSavings = () => {
        if (!hasElite) return 0
        return services
            .filter(s => s.selected)
            .reduce((sum, s) => sum + (s.price - s.elitePrice), 0)
    }

    const calculateTotal = () => {
        const productValue = calculateProductValue()
        const serviceValue = calculateServiceValue()
        const eliteCost = hasElite ? 49.99 : 0
        const savings = calculateEliteSavings()
        return productValue + serviceValue + eliteCost - savings
    }

    const addElite = () => {
        setHasElite(true)
        setShowEliteModal(false)
    }


    const productValue = calculateProductValue()
    const serviceValue = calculateServiceValue()
    const eliteSavings = calculateEliteSavings()
    const total = calculateTotal()

    // Recommended products for empty cart
    const recommendedProducts: Product[] = [
        {
            id: 'rec-1',
            name: 'Premium Vacuum Cleaner Pro 3000',
            productCode: 'REC001',
            price: 299.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=128&h=128&fit=crop&crop=center',
            available: true
        },
        {
            id: 'rec-2',
            name: 'Smart Home Security System',
            productCode: 'REC002',
            price: 449.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=128&h=128&fit=crop&crop=center',
            available: true
        },
        {
            id: 'rec-3',
            name: 'Wireless Bluetooth Speaker Premium',
            productCode: 'REC003',
            price: 79.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=128&h=128&fit=crop&crop=center',
            available: true
        },
        {
            id: 'rec-4',
            name: 'Ergonomic Office Chair Pro',
            productCode: 'REC004',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=128&h=128&fit=crop&crop=center',
            available: true
        },
        {
            id: 'rec-5',
            name: 'Smart Watch Fitness Tracker',
            productCode: 'REC005',
            price: 149.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=128&h=128&fit=crop&crop=center',
            available: true
        },
        {
            id: 'rec-6',
            name: 'Portable Power Bank 20000mAh',
            productCode: 'REC006',
            price: 39.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1609091834317-5e6e30e465f0?w=400&h=400&fit=crop&crop=center',
            available: true
        }
    ]

    const addRecommendedProduct = (product: Product) => {
        setProducts([...products, { ...product, id: `product-${productIdCounter}` }])
        setProductIdCounter(productIdCounter + 1)
    }

    const addSellerProduct = (sellerProduct: { id: string; name: string; price: number; image: string }) => {
        const newProduct: Product = {
            id: `product-${productIdCounter}`,
            name: sellerProduct.name,
            productCode: `SELLER-${sellerProduct.id}`,
            price: sellerProduct.price,
            quantity: 1,
            image: sellerProduct.image,
            available: true
        }
        setProducts([...products, newProduct])
        setProductIdCounter(productIdCounter + 1)
    }

    const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', setState?: (state: { canScrollLeft: boolean; canScrollRight: boolean }) => void) => {
        if (ref.current) {
            // Calculate scroll amount based on item width + gap
            const itemWidth = 220 // carousel item width
            const gap = 24 // gap between items
            const scrollAmount = itemWidth + gap
            const scrollTo = direction === 'left' 
                ? ref.current.scrollLeft - scrollAmount
                : ref.current.scrollLeft + scrollAmount
            ref.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            })
            // Update scroll state after scrolling
            if (setState) {
                setTimeout(() => {
                    if (ref.current) {
                        checkScrollPosition(ref, setState)
                    }
                }, 300)
            }
        }
    }

    const checkScrollPosition = (ref: React.RefObject<HTMLDivElement | null>, setState: (state: { canScrollLeft: boolean; canScrollRight: boolean }) => void) => {
        if (ref.current) {
            const { scrollLeft, scrollWidth, clientWidth } = ref.current
            const canScrollLeft = scrollLeft > 0
            const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1
            setState({ canScrollLeft, canScrollRight })
        }
    }

    const handleCarouselScroll = (ref: React.RefObject<HTMLDivElement | null>, setState: (state: { canScrollLeft: boolean; canScrollRight: boolean }) => void) => {
        checkScrollPosition(ref, setState)
    }

    // Check scroll position on mount and when products change
    useEffect(() => {
        const timer = setTimeout(() => {
            checkScrollPosition(recommendedCarouselRef, setRecommendedScrollState)
            checkScrollPosition(sellerCarouselRef, setSellerScrollState)
        }, 100)
        return () => clearTimeout(timer)
    }, [products])

    // Check seller carousel scroll position when drawer opens
    useEffect(() => {
        if (showSellerDrawer) {
            const timer = setTimeout(() => {
                checkScrollPosition(sellerCarouselRef, setSellerScrollState)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [showSellerDrawer])

  return (
        <div className="clever-commerce">
            {/* Back Button */}
            <div className="cc-back-container">
                <Link to="/" className="cc-back-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Back to Portfolio</span>
                </Link>
            </div>

            {/* Header */}
            <header className="cc-header">
                <ContentContainer>
                    <div className="cc-header-grid">
                        <div className="cc-logo">
                            <div className="cc-logo-icon">
                                <img src={logoIcon} alt="" />
                            </div>
                            <span className="cc-logo-text">Clever Commerce</span>
                        </div>
                        <div className="cc-contact">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g clipPath="url(#clip0_28_470)">
                                    <path d="M14.6615 11.2762V13.2756C14.6623 13.4612 14.6243 13.6449 14.5499 13.815C14.4756 13.985 14.3665 14.1377 14.2297 14.2631C14.093 14.3886 13.9315 14.4842 13.7557 14.5436C13.5799 14.6031 13.3936 14.6252 13.2087 14.6085C11.1579 14.3856 9.18804 13.6849 7.45728 12.5625C5.84704 11.5393 4.48184 10.1741 3.45862 8.56381C2.33231 6.82519 1.63139 4.84571 1.41264 2.78574C1.39598 2.60144 1.41788 2.4157 1.47695 2.24034C1.53601 2.06497 1.63094 1.90382 1.7557 1.76716C1.88045 1.63049 2.0323 1.5213 2.20157 1.44653C2.37083 1.37177 2.55382 1.33306 2.73886 1.33289H4.73819C5.06162 1.32971 5.37517 1.44424 5.62041 1.65514C5.86564 1.86604 6.02581 2.15891 6.07108 2.47917C6.15547 3.119 6.31197 3.74723 6.53759 4.35188C6.62726 4.59042 6.64666 4.84966 6.59351 5.09889C6.54036 5.34811 6.41687 5.57688 6.23769 5.75808L5.39131 6.60446C6.34003 8.27294 7.7215 9.65441 9.38997 10.6031L10.2364 9.75674C10.4176 9.57756 10.6463 9.45408 10.8955 9.40093C11.1448 9.34777 11.404 9.36718 11.6426 9.45684C12.2472 9.68247 12.8754 9.83897 13.5153 9.92336C13.839 9.96903 14.1347 10.1321 14.346 10.3815C14.5574 10.631 14.6697 10.9494 14.6615 11.2762Z" stroke="white" strokeWidth="1.33289" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_28_470">
                                        <rect width="15.9947" height="15.9947" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>763 234 231</span>
                        </div>
                    </div>
                </ContentContainer>
            </header>

            {/* Main Content */}
            <main className="cc-main">
                <ContentContainer>
                    <div className="cc-container">
                    {/* Cart Header */}
                    <div className="cc-cart-header">
                        <h1 className="cc-cart-title">Shopping Cart ({products.length + (hasElite ? 1 : 0)})</h1>
                        {products.length > 0 && (
                            <div className="cc-cart-actions">
                                <button className="cc-action-btn" onClick={removeAllProducts}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Remove all</span>
                                </button>
                                <button className="cc-action-btn" onClick={() => setShowShareMenu(!showShareMenu)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                                        <path d="M8.59 13.51l6.82 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Share cart</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Two Column Layout */}
                    {products.length === 0 ? (
                        /* Empty Cart View */
                        <div className="cc-empty-cart">
                            <div className="cc-empty-cart-message">
                                <h2 className="cc-empty-cart-title">Your cart is empty</h2>
                                <p className="cc-empty-cart-text">Looks like you haven't added any items to your cart yet.</p>
                                <Link to="/" className="cc-empty-cart-btn">
                                    Visit Home Page
                                </Link>
                            </div>
                            
                            <div className="cc-recommended-section">
                                <h3 className="cc-recommended-title">Recommended for you</h3>
                                <div className="cc-products-carousel">
                                    {recommendedScrollState.canScrollLeft && (
                                        <button 
                                            className="cc-carousel-arrow cc-carousel-arrow-left"
                                            onClick={() => scrollCarousel(recommendedCarouselRef, 'left', setRecommendedScrollState)}
                                            aria-label="Scroll left"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    )}
                                    <div 
                                        className="cc-carousel-container" 
                                        ref={recommendedCarouselRef}
                                        onScroll={() => handleCarouselScroll(recommendedCarouselRef, setRecommendedScrollState)}
                                    >
                                        {recommendedProducts.map((product) => (
                                            <div key={product.id} className="cc-carousel-item">
                                                <div className="cc-carousel-product-image">
                                                    <img src={product.image} alt="" />
                                                </div>
                                                <div className="cc-carousel-product-info">
                                                    <h4 className="cc-carousel-product-name">{product.name}</h4>
                                                    <div className="cc-carousel-product-price">${formatPrice(product.price)}</div>
                                                    <button 
                                                        className="cc-carousel-add-btn"
                                                        onClick={() => addRecommendedProduct(product)}
                                                    >
                                                        Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {recommendedScrollState.canScrollRight && (
                                        <button 
                                            className="cc-carousel-arrow cc-carousel-arrow-right"
                                            onClick={() => scrollCarousel(recommendedCarouselRef, 'right', setRecommendedScrollState)}
                                            aria-label="Scroll right"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="cc-content-wrapper">
                            {/* Left Column - Products & Services */}
                            <div className="cc-left-column">
                                {/* Cart Header - Inside content wrapper for desktop */}
                                <div className="cc-cart-header-desktop">
                                    <h1 className="cc-cart-title">Shopping Cart ({products.length + (hasElite ? 1 : 0)})</h1>
                                    <div className="cc-cart-actions">
                                        <button className="cc-action-btn" onClick={removeAllProducts}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            <span>Remove all</span>
                                        </button>
                                        <button className="cc-action-btn" onClick={() => setShowShareMenu(!showShareMenu)}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                                                <path d="M8.59 13.51l6.82 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            <span>Share cart</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Products Section */}
                                <div className="cc-products-section">
                                    <div className="cc-seller-group">
                                        <div className="cc-seller-header">
                                            <span className="cc-seller-label">Seller:</span>
                                            <button onClick={() => setShowSellerDrawer(true)} className="cc-seller-name">Clean House</button>
                                        </div>

                                        <div className="cc-products-list">
                                        {products.map((product, index) => (
                                            <React.Fragment key={product.id}>
                                                <div className="cc-product-item">
                                                    <div className="cc-product-image">
                                                        <img src={product.image} alt="" />
                                                    </div>
                                                    <div className="cc-product-details">
                                                        <div className="cc-product-main-row">
                                                            <div className="cc-product-info">
                                                                <h3 className="cc-product-name">{product.name}</h3>
                                                                <div className="cc-product-meta">
                                                                    <span className="cc-product-code">PRODUCT CODE: {product.productCode}</span>
                                                                    <div className="cc-availability">
                                                                        <span className="cc-availability-dot"></span>
                                                                        <span>Available</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="cc-product-controls">
                                                                <div className="cc-quantity-controls">
                                                                    <button
                                                                        className="cc-quantity-btn"
                                                                        onClick={() => product.quantity === 1 ? removeProduct(product.id) : updateQuantity(product.id, -1)}
                                                                        aria-label="Decrease quantity"
                                                                    >
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                            <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                        </svg>
                                                                    </button>
                                                                    <span className="cc-quantity-value">{product.quantity}</span>
                                                                    <button
                                                                        className="cc-quantity-btn"
                                                                        onClick={() => updateQuantity(product.id, 1)}
                                                                        aria-label="Increase quantity"
                                                                    >
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className="cc-product-price">${formatPrice(product.price * product.quantity)}</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="cc-remove-btn"
                                                            onClick={() => removeProduct(product.id)}
                                                        >
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                            </svg>
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                {product.id === '2' && (
                                                    <>
                                                        {/* Services Section */}
                                                        <div className="cc-services-section">
                                                            <div className="cc-services-card">
                                                                <div className="cc-services-header">
                                                                    <h2 className="cc-services-title">Add useful services</h2>
                                                                    <div className="cc-services-promo">
                                                                        {hasElite ? (
                                                                            <>
                                                                                <div className="cc-elite-badge">Elite Member</div>
                                                                                <span className="cc-promo-text cc-promo-text-green">You are saving on services!</span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="cc-elite-badge">Elite</div>
                                                                                <span 
                                                                                    className="cc-promo-text cc-promo-link" 
                                                                                    onClick={() => setShowElitePromoModal(true)}
                                                                                    style={{ cursor: 'pointer' }}
                                                                                >
                                                                                    Check out and get 50% off on selected services!
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="cc-services-list">
                                                                    {services.map((service) => (
                                                                        <React.Fragment key={service.id}>
                                                                            <div className="cc-service-item">
                                                                                <div className="cc-service-left">
                                                                                    <label className="cc-service-checkbox">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={service.selected}
                                                                                            onChange={() => toggleService(service.id)}
                                                                                        />
                                                                                        <span className="cc-checkmark"></span>
                                                                                    </label>
                                                                                    <div className="cc-service-info">
                                                                                        <span className="cc-service-name">{service.name}</span>
                                                                                        <button 
                                                                                            className="cc-details-link" 
                                                                                            onClick={() => {
                                                                                                setSelectedServiceId(service.id)
                                                                                                setShowServiceDetailsDrawer(true)
                                                                                            }}
                                                                                        >
                                                                                            Details
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cc-service-price">
                                                                                    {service.price === service.elitePrice ? (
                                                                                        <span className="cc-price-current">${formatPrice(service.price)}</span>
                                                                                    ) : hasElite ? (
                                                                                        <>
                                                                                            <span className="cc-price-current elite-price">${formatPrice(service.elitePrice)}</span>
                                                                                            <span className="cc-price-original">${formatPrice(service.price)}</span>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <span className="cc-price-current">${formatPrice(service.price)}</span>
                                                                                            <div className="cc-price-elite-container">
                                                                                                <span className="cc-price-elite">or ${formatPrice(service.elitePrice)}</span>
                                                                                                <div className="cc-elite-badge-small">Elite</div>
                                                                                            </div>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            {service.id !== services[services.length - 1].id && (
                                                                                <div className="cc-divider-dashed"></div>
                                                                            )}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {product.id !== '2' && index < products.length - 1 && <div className="cc-divider"></div>}
                                            </React.Fragment>
                                        ))}
                                        {/* Elite Item (if added) - at the end */}
                                        {hasElite && (
                                            <>
                                                <div className="cc-divider"></div>
                                                <div className="cc-product-item">
                                                    <div className="cc-product-image">
                                                        <div className="cc-elite-cart-badge">
                                                            <div className="cc-elite-cart-badge-content">
                                                                <span className="cc-elite-cart-title">Elite</span>
                                                                <div className="cc-elite-cart-divider"></div>
                                                                <span className="cc-elite-cart-subtitle">Shop smart</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cc-product-details">
                                                        <div className="cc-product-main-row">
                                                            <div className="cc-product-info">
                                                                <h3 className="cc-product-name">Elite program</h3>
                                                                <div className="cc-product-meta">
                                                                    <button className="cc-elite-benefits-link" onClick={() => setShowBenefitsDrawer(true)}>List of benefits</button>
                                                                </div>
                                                            </div>
                                                            <div className="cc-product-controls cc-elite-controls">
                                                                <div className="cc-elite-price-wrapper">
                                                                    <div className="cc-elite-plan-duration">12-month plan</div>
                                                                    <div className="cc-elite-cart-price">$49.99</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="cc-remove-btn"
                                                            onClick={() => {
                                                                setHasElite(false)
                                                                setShowEliteRemovedSnackbar(true)
                                                                setTimeout(() => setShowEliteRemovedSnackbar(false), 3000)
                                                            }}
                                                        >
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                            </svg>
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column - Summary */}
                        <div className="cc-right-column">
                            {/* Summary Section */}
                            <div className="cc-summary-section">
                                <div className="cc-summary-card">
                                    <div className="cc-summary-row">
                                        <span>Product value</span>
                                        <span>${formatPrice(productValue)}</span>
                                    </div>
                                    {serviceValue > 0 && (
                                        <div className="cc-summary-row">
                                            <span>Service value</span>
                                            <span>${formatPrice(serviceValue)}</span>
                                        </div>
                                    )}
                                    {hasElite && (
                                        <div className="cc-summary-row">
                                            <span>Elite</span>
                                            <span>$49.99</span>
                                        </div>
                                    )}
                                    <div className="cc-divider-dashed"></div>
                                    {hasElite && eliteSavings > 0 && (
                                        <div className="cc-summary-row cc-savings">
                                            <div>
                                                <span>Savings with </span>
                                                <div className="cc-elite-badge-small">Elite</div>
                                            </div>
                                            <span className="cc-savings-amount">-${formatPrice(eliteSavings)}</span>
                                        </div>
                                    )}
                                    <div className="cc-summary-total">
                                        <span>Total</span>
                                        <span>${formatPrice(total)}</span>
                                    </div>
                                    <button
                                        className="cc-checkout-btn"
                                        onClick={() => {
                                            if (!hasElite && services.some(s => s.selected)) {
                                                setShowEliteModal(true)
                                            } else {
                                                // Handle checkout - could show success message or navigate
                                                alert('Proceeding to checkout...')
                                            }
                                        }}
                                    >
                                        PROCEED TO CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                        )}
                    </div>
                </ContentContainer>
            </main>

            {/* Elite Modal */}
            {showEliteModal && (
                <div className="cc-modal-overlay" onClick={() => setShowEliteModal(false)}>
                    <div className="cc-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="cc-modal-header">
                            <h2>Add Elite program</h2>
                            <button
                                className="cc-modal-close"
                                onClick={() => setShowEliteModal(false)}
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="cc-modal-body">
                            <div className="cc-elite-plan-card">
                                <div className="cc-elite-plan-header">
                                    <div className="cc-elite-plan-info">
                                        <div className="cc-elite-badge-large">Elite</div>
                                        <div>
                                            <div className="cc-elite-plan-name">Elite</div>
                                            <div className="cc-elite-plan-duration">12-month plan</div>
                                        </div>
                                    </div>
                                    <div className="cc-elite-plan-price">$49.99</div>
                                </div>

                                <div className="cc-divider-dashed"></div>

                                <div className="cc-elite-benefits">
                                    <h3>Save on purchases all year long!</h3>
                                    <div className="cc-benefits-list">
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>50% discount on selected services</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Elite Price Deals</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Free delivery</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Priority customer support</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Early access to new products</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cc-modal-actions">
                                <button
                                    className="cc-modal-btn cc-modal-btn-secondary"
                                    onClick={() => setShowEliteModal(false)}
                                >
                                    CANCEL
                                </button>
                                <button
                                    className="cc-modal-btn cc-modal-btn-primary"
                                    onClick={addElite}
                                >
                                    ADD ELITE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Elite Promotion Drawer */}
            {showElitePromoModal && (
                <div className="cc-drawer-overlay" onClick={() => setShowElitePromoModal(false)}>
                    <div className="cc-drawer-content" onClick={(e) => e.stopPropagation()}>
                        <div className="cc-modal-header">
                            <h2>Add Elite program</h2>
                            <button
                                className="cc-modal-close"
                                onClick={() => setShowElitePromoModal(false)}
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="cc-modal-body">
                            <div className="cc-elite-plan-card">
                                <div className="cc-elite-plan-header">
                                    <div className="cc-elite-plan-info">
                                        <div className="cc-elite-badge-large">Elite</div>
                                        <div>
                                            <div className="cc-elite-plan-name">Elite</div>
                                            <div className="cc-elite-plan-duration">12-month plan</div>
                                        </div>
                                    </div>
                                    <div className="cc-elite-plan-price">$49.99</div>
                                </div>

                                <div className="cc-divider-dashed"></div>

                                <div className="cc-elite-benefits">
                                    <h3>Save on purchases all year long!</h3>
                                    <div className="cc-benefits-list">
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>50% discount on selected services</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Elite Price Deals</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Free delivery</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Priority customer support</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Early access to new products</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cc-modal-actions2">
                                <button
                                    className="cc-modal-btn cc-modal-btn-secondary"
                                    onClick={() => setShowElitePromoModal(false)}
                                >
                                    CANCEL
                                </button>
                                <button
                                    className="cc-modal-btn cc-modal-btn-primary"
                                    onClick={() => {
                                        addElite()
                                        setShowElitePromoModal(false)
                                        setRemovedProduct(null)
                                        setShowSnackbar(true)
                                        setTimeout(() => setShowSnackbar(false), 3000)
                                    }}
                                >
                                    ADD ELITE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Seller Drawer */}
            {showSellerDrawer && (
                <div className="cc-drawer-overlay" onClick={() => setShowSellerDrawer(false)}>
                    <div className="cc-drawer-content" onClick={(e) => e.stopPropagation()}>
                        <div className="cc-modal-header">
                            <h2>Clean House</h2>
                            <button
                                className="cc-modal-close"
                                onClick={() => setShowSellerDrawer(false)}
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="cc-modal-body">
                            {/* Seller Header */}
                            <div className="cc-seller-drawer-header">
                                <div className="cc-seller-drawer-info">
                                    <h3 className="cc-seller-drawer-title">Clean House</h3>
                                    <div className="cc-seller-page-rating">
                                        <div className="cc-rating-stars">
                                            {[...Array(4)].map((_, i) => (
                                                <svg key={`full-${i}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8 0L10.163 5.528L16 6.112L11.82 9.944L12.944 16L8 12.944L3.056 16L4.18 9.944L0 6.112L5.837 5.528L8 0Z" fill="#FFD700"/>
                                                </svg>
                                            ))}
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 0L10.163 5.528L16 6.112L11.82 9.944L12.944 16L8 12.944L3.056 16L4.18 9.944L0 6.112L5.837 5.528L8 0Z" fill="#FFD700" fillOpacity="0.5"/>
                                            </svg>
                                        </div>
                                        <span className="cc-seller-rating-value">4.7</span>
                                        <span className="cc-seller-reviews-count">(1247 reviews)</span>
                                    </div>
                                    <div className="cc-seller-verified">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 0L10.163 5.528L16 6.112L11.82 9.944L12.944 16L8 12.944L3.056 16L4.18 9.944L0 6.112L5.837 5.528L8 0Z" fill="#3BAB55"/>
                                        </svg>
                                        <span>Verified Seller</span>
                                    </div>
                                </div>
                            </div>

                            {/* Seller Details */}
                            <div className="cc-seller-details-card">
                                <h2 className="cc-seller-section-title">About Clean House</h2>
                                <p className="cc-seller-description">Your trusted partner for quality home and electronics products. We specialize in premium household items and cutting-edge technology.</p>
                                
                                <div className="cc-seller-info-grid">
                                    <div className="cc-seller-info-item">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" stroke="#303030" strokeWidth="1.5"/>
                                            <path d="M10 18.3333C13.6819 18.3333 16.6667 15.3486 16.6667 11.6667C16.6667 7.98477 13.6819 5 10 5C6.3181 5 3.33333 7.98477 3.33333 11.6667C3.33333 15.3486 6.3181 18.3333 10 18.3333Z" stroke="#303030" strokeWidth="1.5"/>
                                        </svg>
                                        <div>
                                            <div className="cc-seller-info-label">Address</div>
                                            <div className="cc-seller-info-value">123 Commerce Street, Business District, 12345</div>
                                        </div>
                                    </div>
                                    <div className="cc-seller-info-item">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M2.5 6.66667L10 11.6667L17.5 6.66667M2.5 13.3333L10 18.3333L17.5 13.3333" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <div>
                                            <div className="cc-seller-info-label">Email</div>
                                            <div className="cc-seller-info-value">contact@cleanhouse.com</div>
                                        </div>
                                    </div>
                                    <div className="cc-seller-info-item">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#303030" strokeWidth="1.5"/>
                                            <path d="M10 5V10L13.3333 11.6667" stroke="#303030" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        <div>
                                            <div className="cc-seller-info-label">Established</div>
                                            <div className="cc-seller-info-value">Since 2015</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products Section */}
                            <div className="cc-seller-products-section">
                                <h2 className="cc-seller-section-title">Products from Clean House</h2>
                                <div className="cc-products-carousel">
                                    {sellerScrollState.canScrollLeft && (
                                        <button 
                                            className="cc-carousel-arrow cc-carousel-arrow-left"
                                            onClick={() => scrollCarousel(sellerCarouselRef, 'left', setSellerScrollState)}
                                            aria-label="Scroll left"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    )}
                                    <div 
                                        className="cc-carousel-container" 
                                        ref={sellerCarouselRef}
                                        onScroll={() => handleCarouselScroll(sellerCarouselRef, setSellerScrollState)}
                                    >
                                        {[
                                            { id: '1', name: 'Finish Powerball Automatic Dishwasher Detergent, All in 1 Ultra Powerful Clean, 2.4 KG - 140 Tabs', price: 24.99, image: 'https://www.finish.pl/static/9681c2c6f4da6db4859dcc0fdc870ad9/623b2/pl-PL-finish_ultimate_plus_lemon_45_pl_5908252010998_3279034_front_hi_res.webp', rating: 4.5, reviews: 342 },
                                            { id: '2', name: 'SAMSUNG QE55QN77F 55" QD-Mini LED 4K Mini LED 144Hz Tizen TV HDMI 2.1 Television', price: 3099.00, image: 'https://images.samsung.com/is/image/samsung/p6pim/pl/qe65q7faauxxh/gallery/pl-qled-q7-561726-qe65q7faauxxh-548648523?$Q90_1368_1094_F_JPG$', rating: 4.8, reviews: 89 },
                                            { id: '3', name: 'Premium Vacuum Cleaner Pro 3000', price: 299.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=128&h=128&fit=crop&crop=center', rating: 4.6, reviews: 156 },
                                            { id: '4', name: 'Smart Home Security System', price: 449.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=128&h=128&fit=crop&crop=center', rating: 4.7, reviews: 203 },
                                            { id: '5', name: 'Wireless Bluetooth Speaker Premium', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=128&h=128&fit=crop&crop=center', rating: 4.4, reviews: 278 },
                                            { id: '6', name: 'Ergonomic Office Chair Pro', price: 199.99, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=128&h=128&fit=crop&crop=center', rating: 4.9, reviews: 412 }
                                        ].map((product) => {
                                            const fullStars = Math.floor(product.rating)
                                            const hasHalfStar = product.rating % 1 >= 0.5
                                            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
                                            
                                            return (
                                                <div key={product.id} className="cc-carousel-item">
                                                    <div className="cc-carousel-product-image">
                                                        <img src={product.image} alt="" />
                                                    </div>
                                                    <div className="cc-carousel-product-info">
                                                        <h4 className="cc-carousel-product-name">{product.name}</h4>
                                                        <div className="cc-seller-product-rating">
                                                            <div className="cc-rating-stars">
                                                                {[...Array(fullStars)].map((_, i) => (
                                                                    <svg key={`full-${i}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                        <path d="M8 0L10.163 5.528L16 6.112L11.82 9.944L12.944 16L8 12.944L3.056 16L4.18 9.944L0 6.112L5.837 5.528L8 0Z" fill="#FFD700"/>
                                                                    </svg>
                                                                ))}
                                                                {hasHalfStar && (
                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                        <path d="M8 0L10.163 5.528L16 6.112L11.82 9.944L12.944 16L8 12.944L3.056 16L4.18 9.944L0 6.112L5.837 5.528L8 0Z" fill="#FFD700" fillOpacity="0.5"/>
                                                                    </svg>
                                                                )}
                                                                {[...Array(emptyStars)].map((_, i) => (
                                                                    <svg key={`empty-${i}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                        <path d="M8 0L10.163 5.528L16 6.112L11.82 9.944L12.944 16L8 12.944L3.056 16L4.18 9.944L0 6.112L5.837 5.528L8 0Z" fill="#D9D9D9"/>
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <span className="cc-product-rating-value">{product.rating}</span>
                                                            <span className="cc-product-reviews">({product.reviews})</span>
                                                        </div>
                                                        <div className="cc-carousel-product-price">${formatPrice(product.price)}</div>
                                                        <button 
                                                            className="cc-carousel-add-btn"
                                                            onClick={() => addSellerProduct(product)}
                                                        >
                                                            ADD TO CART
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {sellerScrollState.canScrollRight && (
                                        <button 
                                            className="cc-carousel-arrow cc-carousel-arrow-right"
                                            onClick={() => scrollCarousel(sellerCarouselRef, 'right', setSellerScrollState)}
                                            aria-label="Scroll right"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="cc-modal-actions2">
                                <button
                                    className="cc-modal-btn cc-modal-btn-secondary"
                                    onClick={() => setShowSellerDrawer(false)}
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Remove All Confirmation Dialog */}
            {showRemoveAllConfirm && (
                <div className="cc-modal-overlay" onClick={() => setShowRemoveAllConfirm(false)}>
                    <div className="cc-modal-content cc-confirm-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="cc-modal-header">
                            <h2>Remove all products</h2>
                            <button
                                className="cc-modal-close"
                                onClick={() => setShowRemoveAllConfirm(false)}
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="cc-modal-body">
                            <p className="cc-confirm-message">
                                Are you sure you want to remove all products from your cart?
                            </p>
                        </div>

                        <div className="cc-modal-actions">
                            <button
                                className="cc-modal-btn cc-modal-btn-secondary"
                                onClick={() => setShowRemoveAllConfirm(false)}
                            >
                                CANCEL
                            </button>
                            <button
                                className="cc-modal-btn cc-modal-btn-primary"
                                onClick={confirmRemoveAll}
                            >
                                REMOVE ALL
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Benefits Drawer */}
            {showBenefitsDrawer && (
                <div className="cc-drawer-overlay" onClick={() => setShowBenefitsDrawer(false)}>
                    <div className="cc-drawer-content" onClick={(e) => e.stopPropagation()}>
                        <div className="cc-modal-header">
                            <h2>Elite Program Benefits</h2>
                            <button
                                className="cc-modal-close"
                                onClick={() => setShowBenefitsDrawer(false)}
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="cc-modal-body">
                            <div className="cc-elite-plan-card">
                                <div className="cc-elite-plan-header">
                                    <div className="cc-elite-plan-info">
                                        <div className="cc-elite-badge-large">Elite</div>
                                        <div>
                                            <div className="cc-elite-plan-name">Elite Membership</div>
                                            <div className="cc-elite-plan-duration">12-month plan</div>
                                        </div>
                                    </div>
                                    <div className="cc-elite-plan-price">$49.99</div>
                                </div>

                                <div className="cc-divider-dashed"></div>

                                <div className="cc-elite-benefits">
                                    <h3>Save on purchases all year long!</h3>
                                    <p className="cc-benefits-intro">You're getting exclusive access to premium deals and services with your Elite membership. Here's what's included in your 12-month plan:</p>
                                    <div className="cc-benefits-list">
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>50% discount on selected services</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Elite Price Deals</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Free delivery</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Priority customer support</span>
                                        </div>
                                        <div className="cc-benefit-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Early access to new products</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="cc-divider-dashed"></div>

                                <div className="cc-benefits-marketing">
                                    <p className="cc-marketing-text">Your Elite membership is already in your cart. Enjoy all these benefits for just $49.99 per year!</p>
                                </div>
                            </div>

                            <div className="cc-modal-actions2">
                                <button
                                    className="cc-modal-btn cc-modal-btn-secondary"
                                    onClick={() => setShowBenefitsDrawer(false)}
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Service Details Drawer */}
            {showServiceDetailsDrawer && selectedServiceId && (() => {
                const service = services.find(s => s.id === selectedServiceId)
                if (!service) return null
                return (
                    <div className="cc-drawer-overlay" onClick={() => setShowServiceDetailsDrawer(false)}>
                        <div className="cc-drawer-content" onClick={(e) => e.stopPropagation()}>
                            <div className="cc-modal-header">
                                <h2>{service.name}</h2>
                                <button
                                    className="cc-modal-close"
                                    onClick={() => setShowServiceDetailsDrawer(false)}
                                    aria-label="Close modal"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="cc-modal-body">
                                {service.image && (
                                    <div className="cc-service-image-container">
                                        <img src={service.image} alt="" className="cc-service-image" />
                                    </div>
                                )}
                                
                                {service.description && (
                                    <p className="cc-service-description">{service.description}</p>
                                )}
                                
                                {service.details && service.details.length > 0 && (
                                    <div className="cc-service-details-list">
                                        <h3>What's included:</h3>
                                        <ul className="cc-service-details-items">
                                            {service.details.map((detail, index) => (
                                                <li key={index} className="cc-service-detail-item">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.333 4L6 11.333 2.667 8" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                <div className="cc-service-details-price">
                                    {service.price === service.elitePrice ? (
                                        <div className="cc-service-price-detail">
                                            <span className="cc-price-current">${formatPrice(service.price)}</span>
                                        </div>
                                    ) : hasElite ? (
                                        <div className="cc-service-price-detail">
                                            <span className="cc-price-current elite-price">${formatPrice(service.elitePrice)}</span>
                                            <span className="cc-price-original">${formatPrice(service.price)}</span>
                                        </div>
                                    ) : (
                                        <div className="cc-service-price-detail">
                                            <span className="cc-price-current">${formatPrice(service.price)}</span>
                                            <div className="cc-price-elite-container">
                                                <span className="cc-price-elite">or ${formatPrice(service.elitePrice)}</span>
                                                <div className="cc-elite-badge-small">Elite</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="cc-modal-actions2">
                                    <button
                                        className="cc-modal-btn cc-modal-btn-secondary"
                                        onClick={() => setShowServiceDetailsDrawer(false)}
                                    >
                                        CLOSE
                                    </button>
                                    <button
                                        className="cc-modal-btn cc-modal-btn-primary"
                                        onClick={() => {
                                            toggleService(service.id)
                                            setShowServiceDetailsDrawer(false)
                                        }}
                                    >
                                        {service.selected ? 'REMOVE FROM CART' : 'ADD TO CART'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })()}

            {/* Snackbar */}
            {showSnackbar && (
                <div className="cc-snackbar">
                    <span>{removedProduct ? 'Product removed' : 'Elite program added successfully!'}</span>
                    {removedProduct && (
                        <button className="cc-snackbar-undo" onClick={undoRemoveProduct}>
                            Undo
                        </button>
                    )}
                </div>
            )}

            {/* Service Snackbar */}
            {serviceSnackbar.show && (
                <div className="cc-snackbar">
                    <span>{serviceSnackbar.message}</span>
                </div>
            )}

            {/* Elite Removed Snackbar */}
            {showEliteRemovedSnackbar && (
                <div className="cc-snackbar">
                    <span>Elite program removed from cart</span>
                </div>
            )}
        </div>
  )
}

export default CleverCommerce
