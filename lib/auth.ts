export type UserRole = 'admin' | 'user'

export interface AuthUser {
  username: string
  role: UserRole
}

const USERS: Record<string, { password: string; role: UserRole }> = {
  admin: { password: 'admin', role: 'admin' },
  user: { password: '1234', role: 'user' },
}

export function login(username: string, password: string): AuthUser | null {
  const u = USERS[username]
  if (!u || u.password !== password) return null
  return { username, role: u.role }
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('ecs_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: AuthUser) {
  localStorage.setItem('ecs_user', JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem('ecs_user')
}
