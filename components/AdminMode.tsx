'use client'

interface AdminModeProps {
  isAdminMode: boolean
  setIsAdminMode: (value: boolean) => void
}

export default function AdminMode({ isAdminMode, setIsAdminMode }: AdminModeProps) {
  const toggleAdminMode = () => {
    if (!isAdminMode) {
      const password = prompt('Enter admin password:')
      if (password === 'admin') {
        setIsAdminMode(true)
      } else {
        alert('Incorrect password')
      }
    } else {
      setIsAdminMode(false)
    }
  }

  return (
    <button
      onClick={toggleAdminMode}
      className={`px-4 py-2 border-2 rounded font-semibold transition-colors text-sm ${
        isAdminMode
          ? 'bg-rm-red border-rm-red text-white'
          : 'border-rm-light-grey bg-white hover:border-rm-red hover:text-rm-red'
      }`}
    >
      {isAdminMode ? '🔓 Admin Mode' : '🔒 Admin Mode'}
    </button>
  )
}
