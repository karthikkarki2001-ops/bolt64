const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('mindcare_auth_token', token);
  } else {
    localStorage.removeItem('mindcare_auth_token');
  }
};

export const getAuthToken = (): string | null => {
  if (!authToken) {
    authToken = localStorage.getItem('mindcare_auth_token');
  }
  return authToken;
};

const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  auth: {
    register: async (userData: any) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });
      const data = await handleResponse(response);
      if (data.token) {
        setAuthToken(data.token);
      }
      return data;
    },

    login: async (email: string, password: string, role?: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password, role }),
      });
      const data = await handleResponse(response);
      if (data.token) {
        setAuthToken(data.token);
      }
      return data;
    },

    logout: () => {
      setAuthToken(null);
    },
  },

  users: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/users`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    update: async (id: string, userData: any) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  bookings: {
    getAll: async (filters?: { userId?: string; therapistId?: string }) => {
      const params = new URLSearchParams();
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.therapistId) params.append('therapistId', filters.therapistId);

      const response = await fetch(`${API_URL}/bookings?${params}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    create: async (bookingData: any) => {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(bookingData),
      });
      return handleResponse(response);
    },

    update: async (id: string, bookingData: any) => {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(bookingData),
      });
      return handleResponse(response);
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  mood: {
    getAll: async (userId?: string) => {
      const params = userId ? `?userId=${userId}` : '';
      const response = await fetch(`${API_URL}/mood${params}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    create: async (moodData: any) => {
      const response = await fetch(`${API_URL}/mood`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(moodData),
      });
      return handleResponse(response);
    },

    update: async (id: string, moodData: any) => {
      const response = await fetch(`${API_URL}/mood/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(moodData),
      });
      return handleResponse(response);
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/mood/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  therapy: {
    getProgress: async (userId: string) => {
      const response = await fetch(`${API_URL}/therapy/progress/${userId}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    updateProgress: async (userId: string, progressData: any) => {
      const response = await fetch(`${API_URL}/therapy/progress/${userId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(progressData),
      });
      return handleResponse(response);
    },

    getCBTRecords: async (userId?: string) => {
      const params = userId ? `?userId=${userId}` : '';
      const response = await fetch(`${API_URL}/therapy/cbt${params}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    createCBTRecord: async (recordData: any) => {
      const response = await fetch(`${API_URL}/therapy/cbt`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(recordData),
      });
      return handleResponse(response);
    },

    getGratitudeEntries: async (userId?: string) => {
      const params = userId ? `?userId=${userId}` : '';
      const response = await fetch(`${API_URL}/therapy/gratitude${params}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    createGratitudeEntry: async (entryData: any) => {
      const response = await fetch(`${API_URL}/therapy/gratitude`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(entryData),
      });
      return handleResponse(response);
    },

    getSessions: async (filters?: { userId?: string; moduleName?: string }) => {
      const params = new URLSearchParams();
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.moduleName) params.append('moduleName', filters.moduleName);

      const response = await fetch(`${API_URL}/therapy/sessions?${params}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    createSession: async (sessionData: any) => {
      const response = await fetch(`${API_URL}/therapy/sessions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(sessionData),
      });
      return handleResponse(response);
    },
  },

  therapistServices: {
    getAll: async (status?: string) => {
      const params = status ? `?status=${status}` : '';
      const response = await fetch(`${API_URL}/therapist-services${params}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    create: async (serviceData: any) => {
      const response = await fetch(`${API_URL}/therapist-services`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(serviceData),
      });
      return handleResponse(response);
    },

    update: async (id: string, serviceData: any) => {
      const response = await fetch(`${API_URL}/therapist-services/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(serviceData),
      });
      return handleResponse(response);
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/therapist-services/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  analytics: {
    trackEvent: async (eventData: any) => {
      const response = await fetch(`${API_URL}/analytics/events`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(eventData),
      });
      return handleResponse(response);
    },

    getEvents: async (filters?: { type?: string; userId?: string; startDate?: string; endDate?: string }) => {
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const response = await fetch(`${API_URL}/analytics/events?${params}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getMetrics: async () => {
      const response = await fetch(`${API_URL}/analytics/metrics`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  chat: {
    getSession: async (userId: string) => {
      const response = await fetch(`${API_URL}/chat/${userId}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    saveMessage: async (userId: string, message: any) => {
      const response = await fetch(`${API_URL}/chat/${userId}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ message }),
      });
      return handleResponse(response);
    },

    clearSession: async (userId: string) => {
      const response = await fetch(`${API_URL}/chat/${userId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  streak: {
    getData: async (userId: string) => {
      const response = await fetch(`${API_URL}/streak/${userId}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    update: async (userId: string) => {
      const response = await fetch(`${API_URL}/streak/${userId}`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  therapyModules: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/therapy-modules`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/therapy-modules/${id}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    create: async (moduleData: any) => {
      const response = await fetch(`${API_URL}/therapy-modules`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(moduleData),
      });
      return handleResponse(response);
    },

    update: async (id: string, moduleData: any) => {
      const response = await fetch(`${API_URL}/therapy-modules/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(moduleData),
      });
      return handleResponse(response);
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/therapy-modules/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    toggleStatus: async (id: string) => {
      const response = await fetch(`${API_URL}/therapy-modules/${id}/toggle-status`, {
        method: 'PATCH',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  therapyContents: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/therapy-contents`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    getByTherapyId: async (therapyId: string) => {
      const response = await fetch(`${API_URL}/therapy-contents/therapy/${therapyId}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    save: async (contentData: any) => {
      const response = await fetch(`${API_URL}/therapy-contents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(contentData),
      });
      return handleResponse(response);
    },

    publish: async (id: string, isPublished: boolean) => {
      const response = await fetch(`${API_URL}/therapy-contents/${id}/publish`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ isPublished }),
      });
      return handleResponse(response);
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/therapy-contents/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },

  achievements: {
    get: async (userId: string) => {
      const response = await fetch(`${API_URL}/achievements/${userId}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },

    unlock: async (userId: string, achievementData: any) => {
      const response = await fetch(`${API_URL}/achievements/${userId}/unlock`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ achievementData }),
      });
      return handleResponse(response);
    },

    updateStats: async (userId: string, stats: any) => {
      const response = await fetch(`${API_URL}/achievements/${userId}/stats`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ stats }),
      });
      return handleResponse(response);
    },
  },
};
