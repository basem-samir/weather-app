import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getCityGeocoding = createAsyncThunk(
  "weatherSlice/getCityGeocoding",
  async (cityName, { rejectWithValue }) => {
    try {
      const geocoding = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${API_KEY}`
      );
      if (!geocoding.ok) throw new Error("Failed to fetch geocoding");
      const cityGeo = await geocoding.json();
      if (!cityGeo || cityGeo.length === 0) throw new Error("City not found");
      return cityGeo[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentWeather = createAsyncThunk(
  "weatherSlice/getCurrentWeather",
  async (cityName, { rejectWithValue }) => {
    try {
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!currentResponse.ok) throw new Error("Failed to fetch current weather");
      const currentWeather = await currentResponse.json();
      return currentWeather;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAirPollution = createAsyncThunk(
  "weatherSlice/getAirPollution",
  async (cityName, thunkAPI) => {
    try {
      const response = await thunkAPI.dispatch(getCityGeocoding(cityName));
      const cityGeo = response.payload;
      const { lat, lon } = cityGeo;
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const currentAirPollution = await currentResponse.json();
      return currentAirPollution;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Removed getWeatherForecastDays and getWeatherForecastHours since API tier does not support them.

export const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState: {
    geocoding: {},
    data: {},
    air: {},
    city: "cairo",
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityGeocoding.fulfilled, (state, action) => {
        state.geocoding = action.payload;
      })
      .addCase(getCurrentWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || "An error occurred";
      })
      .addCase(getAirPollution.fulfilled, (state, action) => {
        state.air = action.payload;
      });
  },
});

export const { changeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
