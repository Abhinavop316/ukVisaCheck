import api from './api';

/**
 * Lookup client by passport number or email from backend MongoDB.
 * @param {Object} queryData - { PassportNumber, Email, identNum }
 * @returns {Promise<Object>} client object
 */
export const getClientByQuery = async (queryData) => {
  try {
    const response = await api.post('/get-client', queryData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Lookup failed';
    throw new Error(errorMessage);
  }
};

/**
 * Lookup client by Passport Number directly.
 * @param {string} passportNumber
 * @returns {Promise<Object>} client object
 */
export const getClientByPassport = async (passportNumber) => {
  try {
    const cleanPass = encodeURIComponent(passportNumber.trim().toUpperCase());
    const response = await api.get(`/clients/passport/${cleanPass}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Passport lookup failed';
    throw new Error(errorMessage);
  }
};

/**
 * Creates client application in backend.
 * @param {Object} clientData
 * @returns {Promise<Object>}
 */
export const createClient = async (clientData) => {
  try {
    const response = await api.post('/clients', clientData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Failed to create application';
    throw new Error(errorMessage);
  }
};

/**
 * Updates client application in backend.
 * @param {string} id
 * @param {Object} clientData
 * @returns {Promise<Object>}
 */
export const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Failed to update application';
    throw new Error(errorMessage);
  }
};

/**
 * Send 6-digit verification code to applicant's email using Resend
 * @param {string} passportNumber
 * @returns {Promise<Object>}
 */
export const sendSecurityCode = async (passportNumber) => {
  try {
    const response = await api.post('/send-security-code', { passportNumber });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Failed to send security code';
    throw new Error(errorMessage);
  }
};

/**
 * Verify 6-digit security code entered by applicant
 * @param {string} passportNumber
 * @param {string} code
 * @returns {Promise<Object>}
 */
export const verifySecurityCode = async (passportNumber, code) => {
  try {
    const response = await api.post('/verify-security-code', { passportNumber, code });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Invalid security code';
    throw new Error(errorMessage);
  }
};

