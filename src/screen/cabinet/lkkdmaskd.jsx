import React, {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {
    User,
    Settings,
    CreditCard,
    Package,
    RefreshCw,
    LogOut,
    ChevronRight,
    Calendar,
    MapPin,
    Plus,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    ArrowUpRight,
    Home,
    Building,
    Phone,
    Mail,
    Download,
    Filter,
    Search
} from 'lucide-react'

const ProfilePage = () => {
    const [activeScreen, setActiveScreen] = useState('orders')
    const [showPassword, setShowPassword] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const menuItems = [
        {id: 'orders', icon: Package, label: "Buyurtmalar ro'yxati"},
        {id: 'transfers', icon: ArrowUpRight, label: "O'tkazmalar tarixi"},
        {id: 'addresses', icon: Home, label: 'Yetkazib berish manzili'},
        {id: 'cards', icon: CreditCard, label: 'Mening kartalarim'},
        {id: 'password', icon: RefreshCw, label: 'Parolni yangilash'}
    ]

    // Sample data
    const orders = [
        {
            id: '1407068',
            pin: '1215',
            status: "Muddati o'tgan",
            date: '05 iyun 2025',
            amount: '0 UZS',
            items: 'Telefon aksesuarlari',
            address: 'Toshkent, Chilonzor tumani'
        },
        {
            id: '1406607',
            pin: '1367',
            status: "Muddati o'tgan",
            date: '05 iyun 2025',
            amount: '0 UZS',
            items: 'Kompyuter texnikasi',
            address: 'Toshkent, Yunusobod tumani'
        },
        {
            id: '1405432',
            pin: '2841',
            status: 'Yetkazilgan',
            date: '28 may 2025',
            amount: '250,000 UZS',
            items: 'Kiyim-kechak',
            address: "Toshkent, Mirzo Ulug'bek tumani"
        }
    ]

    const transfers = [
        {
            id: 'T001',
            type: "To'lov",
            amount: '250,000 UZS',
            date: '28 may 2025',
            status: 'Muvaffaqiyatli',
            method: 'Click'
        },
        {
            id: 'T002',
            type: 'Qaytarim',
            amount: '45,000 UZS',
            date: '20 may 2025',
            status: 'Kutilmoqda',
            method: 'Payme'
        }
    ]

    const addresses = [
        {
            id: 'A001',
            title: 'Uy manzili',
            address: "Toshkent sh., Chilonzor t., Katartal ko'chasi, 12-uy",
            phone: '+998 90 123 45 67',
            isDefault: true
        },
        {
            id: 'A002',
            title: 'Ish joyi',
            address: "Toshkent sh., Yunusobod t., Amir Temur ko'chasi, 24-uy",
            phone: '+998 90 123 45 67',
            isDefault: false
        }
    ]

    const cards = [
        {
            id: 'C001',
            number: '**** **** **** 1234',
            type: 'Visa',
            expiry: '12/27',
            holder: 'JOHN DOE',
            isDefault: true
        },
        {
            id: 'C002',
            number: '**** **** **** 5678',
            type: 'Mastercard',
            expiry: '08/26',
            holder: 'JOHN DOE',
            isDefault: false
        }
    ]

    const containerVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: {opacity: 0, x: -20},
        visible: {
            opacity: 1,
            x: 0,
            transition: {duration: 0.5}
        }
    }

    const screenVariants = {
        hidden: {opacity: 0, x: 50},
        visible: {
            opacity: 1,
            x: 0,
            transition: {duration: 0.5}
        },
        exit: {
            opacity: 0,
            x: -50,
            transition: {duration: 0.3}
        }
    }

    // Screen Components
    const OrdersScreen = () => (
        <motion.div variants={screenVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold text-[#022133] font-['EB_Garamond']">Buyurtmalar</h1>
                <div className='flex space-x-3'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#022133]/40' />
                        <input
                            type='text'
                            placeholder='Qidirish...'
                            className='pl-10 pr-4 py-2 border border-[#022133]/20 rounded-lg focus:ring-2 focus:ring-[#277fb3]/50 focus:border-[#277fb3]'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className='px-4 py-2 bg-[#277fb3] text-white rounded-lg hover:bg-[#277fb3]/90 flex items-center space-x-2'>
                        <Filter className='w-4 h-4' />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            <div className='grid gap-4'>
                {orders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        className='bg-white rounded-xl p-6 border border-[#022133]/10 hover:shadow-lg transition-all duration-300'
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.1}}
                        whileHover={{y: -2, boxShadow: '0 20px 40px rgba(220, 220, 230, 0.3)'}}>
                        <div className='flex justify-between items-start'>
                            <div className='space-y-3'>
                                <div className='flex items-center space-x-4'>
                                    <div>
                                        <p className='text-xl font-bold text-[#022133]'>#{order.id}</p>
                                        <p className='text-sm text-[#022133]/60'>PIN: {order.pin}</p>
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'Yetkazilgan'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-[#de5f10]/10 text-[#de5f10]'
                                        }`}>
                                        {order.status}
                                    </div>
                                </div>
                                <div className='text-[#022133]/70'>
                                    <p className='font-medium'>{order.items}</p>
                                    <div className='flex items-center space-x-4 mt-2 text-sm'>
                                        <div className='flex items-center space-x-1'>
                                            <Calendar className='w-4 h-4' />
                                            <span>{order.date}</span>
                                        </div>
                                        <div className='flex items-center space-x-1'>
                                            <MapPin className='w-4 h-4' />
                                            <span>{order.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='text-2xl font-bold text-[#277fb3]'>{order.amount}</p>
                                <button className='mt-2 text-[#277fb3] hover:underline text-sm'>
                                    Batafsil ko'rish
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )

    const TransfersScreen = () => (
        <motion.div variants={screenVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-[#022133]'>O'tkazmalar tarixi</h1>
                <button className='px-4 py-2 bg-[#277fb3] text-white rounded-lg hover:bg-[#277fb3]/90 flex items-center space-x-2'>
                    <Download className='w-4 h-4' />
                    <span>Eksport</span>
                </button>
            </div>

            <div className='grid gap-4'>
                {transfers.map((transfer, index) => (
                    <motion.div
                        key={transfer.id}
                        className='bg-white rounded-xl p-6 border border-[#022133]/10'
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: index * 0.1}}>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-4'>
                                <div className='w-12 h-12 bg-[#277fb3]/10 rounded-full flex items-center justify-center'>
                                    <ArrowUpRight className='w-6 h-6 text-[#277fb3]' />
                                </div>
                                <div>
                                    <p className='font-semibold text-[#022133]'>{transfer.type}</p>
                                    <p className='text-sm text-[#022133]/60'>
                                        {transfer.method} • {transfer.date}
                                    </p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='text-xl font-bold text-[#022133]'>{transfer.amount}</p>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                        transfer.status === 'Muvaffaqiyatli'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {transfer.status}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )

    const AddressesScreen = () => (
        <motion.div variants={screenVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold text-[#022133] font-['EB_Garamond']">Yetkazib berish manzillari</h1>
                <button className='px-4 py-2 bg-[#277fb3] text-white rounded-lg hover:bg-[#277fb3]/90 flex items-center space-x-2'>
                    <Plus className='w-4 h-4' />
                    <span>Yangi manzil</span>
                </button>
            </div>

            <div className='grid gap-4'>
                {addresses.map((address, index) => (
                    <motion.div
                        key={address.id}
                        className='bg-white rounded-xl p-6 border border-[#022133]/10 relative'
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.1}}>
                        {address.isDefault && (
                            <div className='absolute top-4 right-4'>
                                <span className='bg-[#277fb3] text-white text-xs px-2 py-1 rounded-full'>Asosiy</span>
                            </div>
                        )}
                        <div className='space-y-3'>
                            <div className='flex items-center space-x-3'>
                                <Home className='w-6 h-6 text-[#277fb3]' />
                                <h3 className='text-lg font-semibold text-[#022133]'>{address.title}</h3>
                            </div>
                            <div className='ml-9 space-y-2'>
                                <div className='flex items-center space-x-2'>
                                    <MapPin className='w-4 h-4 text-[#022133]/60' />
                                    <p className='text-[#022133]/80'>{address.address}</p>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Phone className='w-4 h-4 text-[#022133]/60' />
                                    <p className='text-[#022133]/80'>{address.phone}</p>
                                </div>
                            </div>
                            <div className='ml-9 flex space-x-3 pt-2'>
                                <button className='text-[#277fb3] hover:underline text-sm flex items-center space-x-1'>
                                    <Edit3 className='w-3 h-3' />
                                    <span>Tahrirlash</span>
                                </button>
                                <button className='text-[#de5f10] hover:underline text-sm flex items-center space-x-1'>
                                    <Trash2 className='w-3 h-3' />
                                    <span>O'chirish</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )

    const CardsScreen = () => (
        <motion.div variants={screenVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold text-[#022133] font-['EB_Garamond']">Mening kartalarim</h1>
                <button className='px-4 py-2 bg-[#277fb3] text-white rounded-lg hover:bg-[#277fb3]/90 flex items-center space-x-2'>
                    <Plus className='w-4 h-4' />
                    <span>Karta qo'shish</span>
                </button>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        className='relative'
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: index * 0.1}}>
                        <div className='bg-gradient-to-br from-[#277fb3] to-[#277fb3]/80 text-white rounded-2xl p-6 relative overflow-hidden'>
                            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
                            {card.isDefault && (
                                <div className='absolute top-4 right-4'>
                                    <span className='bg-[#de5f10] text-white text-xs px-2 py-1 rounded-full'>
                                        Asosiy
                                    </span>
                                </div>
                            )}
                            <div className='space-y-4'>
                                <div className='flex justify-between items-start'>
                                    <div className='text-2xl font-bold'>{card.type}</div>
                                    <CreditCard className='w-8 h-8 opacity-80' />
                                </div>
                                <div className='text-xl font-mono tracking-wider'>{card.number}</div>
                                <div className='flex justify-between items-end'>
                                    <div>
                                        <p className='text-xs opacity-80'>Egasi</p>
                                        <p className='font-semibold'>{card.holder}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs opacity-80'>Amal qilish muddati</p>
                                        <p className='font-semibold'>{card.expiry}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4 flex space-x-3'>
                            <button className='text-[#277fb3] hover:underline text-sm flex items-center space-x-1'>
                                <Edit3 className='w-3 h-3' />
                                <span>Tahrirlash</span>
                            </button>
                            <button className='text-[#de5f10] hover:underline text-sm flex items-center space-x-1'>
                                <Trash2 className='w-3 h-3' />
                                <span>O'chirish</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )

    const PasswordScreen = () => (
        <motion.div variants={screenVariants} initial='hidden' animate='visible' exit='exit' className='space-y-6'>
            <h1 className="text-3xl font-bold text-[#022133] font-['EB_Garamond']">Parolni yangilash</h1>

            <div className='bg-white rounded-xl p-8 border border-[#022133]/10 max-w-md'>
                <form className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-[#022133] mb-2'>Joriy parol</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='w-full px-4 py-3 border border-[#022133]/20 rounded-lg focus:ring-2 focus:ring-[#277fb3]/50 focus:border-[#277fb3]'
                                placeholder='Joriy parolingizni kiriting'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#022133]/40 hover:text-[#022133]'>
                                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-[#022133] mb-2'>Yangi parol</label>
                        <input
                            type='password'
                            className='w-full px-4 py-3 border border-[#022133]/20 rounded-lg focus:ring-2 focus:ring-[#277fb3]/50 focus:border-[#277fb3]'
                            placeholder='Yangi parolingizni kiriting'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-[#022133] mb-2'>Parolni tasdiqlash</label>
                        <input
                            type='password'
                            className='w-full px-4 py-3 border border-[#022133]/20 rounded-lg focus:ring-2 focus:ring-[#277fb3]/50 focus:border-[#277fb3]'
                            placeholder='Yangi parolingizni qayta kiriting'
                        />
                    </div>

                    <div className='bg-[#f9fafb] rounded-lg p-4'>
                        <h4 className='font-medium text-[#022133] mb-2'>Parol talablari:</h4>
                        <ul className='text-sm text-[#022133]/70 space-y-1'>
                            <li>• Kamida 8 ta belgi</li>
                            <li>• Katta va kichik harflar</li>
                            <li>• Kamida 1 ta raqam</li>
                            <li>• Kamida 1 ta maxsus belgi</li>
                        </ul>
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-[#277fb3] text-white py-3 rounded-lg hover:bg-[#277fb3]/90 transition-colors duration-200 font-medium'>
                        Parolni yangilash
                    </button>
                </form>
            </div>
        </motion.div>
    )

    const renderScreen = () => {
        switch (activeScreen) {
            case 'orders':
                return <OrdersScreen />
            case 'transfers':
                return <TransfersScreen />
            case 'addresses':
                return <AddressesScreen />
            case 'cards':
                return <CardsScreen />
            case 'password':
                return <PasswordScreen />
            default:
                return <OrdersScreen />
        }
    }

    return (
        <motion.div
            className='min-h-screen bg-[#f9fafb] p-4 md:p-8'
            initial='hidden'
            animate='visible'
            variants={containerVariants}>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    {/* Sidebar */}
                    <motion.div className='lg:col-span-1' variants={itemVariants}>
                        <div className='bg-white rounded-2xl shadow-lg border border-[#022133]/10 overflow-hidden sticky top-8'>
                            {/* Profile Header */}
                            <div className='p-6 bg-gradient-to-br from-[#277fb3] to-[#277fb3]/80 text-white'>
                                <motion.div
                                    className='flex items-center space-x-4'
                                    initial={{scale: 0.9, opacity: 0}}
                                    animate={{scale: 1, opacity: 1}}
                                    transition={{delay: 0.2, duration: 0.5}}>
                                    <div className='w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm'>
                                        <User className='w-8 h-8' />
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-lg'>Profil</h3>
                                        <p className='text-white/80 text-sm'>Foydalanuvchi</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Menu Items */}
                            <div className='p-4'>
                                {menuItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setActiveScreen(item.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl mb-2 transition-all duration-300 ${
                                            activeScreen === item.id
                                                ? 'bg-[#277fb3]/10 text-[#277fb3] border-l-4 border-[#277fb3]'
                                                : 'text-[#022133] hover:bg-[#f9fafb] hover:text-[#277fb3]'
                                        }`}
                                        variants={itemVariants}
                                        whileHover={{x: 4}}
                                        whileTap={{scale: 0.98}}>
                                        <div className='flex items-center space-x-3'>
                                            <item.icon className='w-5 h-5' />
                                            <span className='font-medium text-sm'>{item.label}</span>
                                        </div>
                                        <ChevronRight className='w-4 h-4' />
                                    </motion.button>
                                ))}
                            </div>

                            {/* Logout Button */}
                            <div className='p-4 border-t border-[#022133]/10'>
                                <motion.button
                                    className='w-full flex items-center space-x-3 p-4 text-[#de5f10] hover:bg-[#de5f10]/10 rounded-xl transition-colors duration-300'
                                    whileHover={{x: 4}}
                                    whileTap={{scale: 0.98}}>
                                    <LogOut className='w-5 h-5' />
                                    <span className='font-medium text-sm'>Chiqish</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div className='lg:col-span-3' variants={itemVariants}>
                        <div className='bg-white rounded-2xl shadow-lg border border-[#022133]/10 overflow-hidden min-h-[600px]'>
                            <div className='p-8'>
                                <AnimatePresence mode='wait'>{renderScreen()}</AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProfilePage
