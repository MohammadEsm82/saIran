import api from "./axios";

export const sendOTP = async(number) => {
  try {
    const response = await api.post('/auth/send-otp', {
      phoneNumber: `0${number}`,
    });

    return ({
      success: response.data.success,
      isNew: response.data.data.isNewUser
    })
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

export const verifyOTP = async(data) => {
  try {
    const response = await api.post('/auth/login', 
      data
    );
    console.log(response.data)
    return ({
      success: response.data.success,
      user: response.data.data.user,
      token: response.data.data.token
    })
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}