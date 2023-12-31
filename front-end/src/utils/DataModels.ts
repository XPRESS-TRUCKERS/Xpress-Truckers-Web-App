/**
 * @fileoverview This file contains the data models used in the Xpress Truckers Web App.
 * @packageDocumentation
 */
import {
  driverRequest,
  driverRequestType,
  locationData,
  logInTypes,
  userLoginEmail,
  userLoginPhone,
  userRequest,
  userTypes,
  vehicleTypes,
} from "./types";

/**
 * Represents a driver request.
 */
export class DriverRequest {
  /**
   * The origin of the driver request.
   */
  origin: {};
  /**
   * The destination of the driver request.
   */
  destination: {};
  /**
   * The type of vehicle for the driver request.
   */
  vehicleType: Array<vehicleTypes>;
  /**
   * The services requested for the driver request.
   */
  services: string[];

  /**
   * Creates a new instance of DriverRequest.
   * @param origin The origin of the driver request.
   * @param destination The destination of the driver request.
   * @param vehicleType The type of vehicle for the driver request.
   * @param services The services requested for the driver request.
   */
  constructor(
    origin = {},
    destination = {},
    vehicleType = [vehicleTypes.typeA],
    services = [""]
  ) {
    this.origin = origin;
    this.destination = destination;
    this.vehicleType = vehicleType;
    this.services = services;
  }

  /**
   * Checks if the driver request is valid.
   * @returns True if the driver request is valid, otherwise throws an error.
   */
  isValid() {
    if (!this.origin) {
      throw Error("Current location not selected!");
    } else if (!this.destination) {
      throw Error("Destination not selected!");
    } else if (!this.vehicleType || this.vehicleType[0] === "null") {
      throw Error("Vehicle Type not selected!");
    } else if (!this.services || this.services.length === 0) {
      throw Error("Services not selected!");
    }
    return true;
  }

  /**
   * Converts the driver request to an object.
   * @returns An object representing the driver request.
   */
  toObject(): driverRequestType {
    return {
      origin: this.origin,
      destination: this.destination,
      vehicleType: this.vehicleType,
      services: this.services,
    };
  }

  /**
   * Converts the driver request to a JSON string.
   * @returns A JSON string representing the driver request.
   */
  toRequest() {
    return JSON.stringify(this.toObject());
  }
}

/**
 * Represents a response object containing location data.
 */
export class LocationDataResponse {
  __keys = ["name", "formatted", "geometry"];
  name: string;
  formatted: string;
  geometry: { lat: number; lng: number };

  constructor(data: locationData) {
    this.name = data?.name;
    this.formatted = data?.formatted;
    this.geometry = data?.geometry;
  }
  getShortName() {
    return this.formatted;
  }

  isValid() {
    if (!this.formatted) {
      throw Error("Formatted address not found!");
    } else if (!this.geometry) {
      throw Error("Geometry not found!");
    }
    return true;
  }
  toObject(): locationData {
    return {
      name: this.name,
      formatted: this.formatted,
      geometry: this.geometry,
    };
  }

  [key: string]: any;

  validate(): boolean {
    try {
      for (const key of Object.keys(this.toObject())) {
        if (!this.__keys.includes(key) || !this[key]) {
          console.log(this);
          return false;
        }
      }
    } catch (e) {
      console.log("Error");
      return false;
    }
    return true;
  }
}

/**
 * Represents the data model for user registration.
 */
export class UserRegistrationData {
  private __car_reg_pattern = /^[a-zA-Z]{3} \d{3}[a-zA-Z]$/;
  private __email_reg_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phonenumber: string;
  usertype: userTypes;
  vehicleRegistration: string;
  vehicleType: string;
  vehicleModel: string;
  placeOperation: any;
  services: string[];

  constructor({
    firstname = "",
    lastname = "",
    email = "",
    password = "",
    phonenumber = "",
    usertype = userTypes.REGULAR,
    vehicleRegistration = "",
    vehicleType = "",
    vehicleModel = "",
    placeOperation = {},
    services = [""],
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phonenumber = phonenumber;
    this.usertype = usertype;
    this.vehicleRegistration = vehicleRegistration;
    this.vehicleType = vehicleType;
    this.vehicleModel = vehicleModel;
    this.placeOperation = placeOperation;
    this.services = services;
  }

  isValid() {
    if (this.usertype == userTypes.REGULAR) {
      switch (true) {
        case !this.firstname: {
          throw Error("Firstname not provided!");
        }
        case !this.lastname: {
          throw Error("Lastname not provided!");
        }
        case !this.email: {
          throw Error("Email not provided!");
        }
        case !this.__email_reg_pattern.test(this.email): {
          throw Error("Invalid email!");
        }
        case !this.password: {
          throw Error("Password not provided!");
        }
        case !this.phonenumber: {
          throw Error("Phonenumber not provided!");
        }
      }

      return true;
    }
    switch (true) {
      case !this.firstname: {
        throw Error("Firstname not provided!");
      }
      case !this.lastname: {
        throw Error("Lastname not provided!");
      }
      case !this.email: {
        throw Error("Email not provided!");
      }
      case !this.__email_reg_pattern.test(this.email): {
        throw Error("Invalid email!");
      }
      case !this.password: {
        throw Error("Password not provided!");
      }
      case !this.phonenumber: {
        throw Error("Phonenumber not provided!");
      }
      case !this.vehicleRegistration: {
        throw Error("vehicle Registration not provided!");
      }
      case !this.__car_reg_pattern.test(this.vehicleRegistration): {
        throw Error("Invalid vehicle registration!");
      }
      case !this.vehicleType: {
        throw Error("Vehicle type not provided!");
      }
      case !this.vehicleModel: {
        throw Error("Vehicle model not provided!");
      }
      case typeof this.placeOperation === "string": {
        throw Error(
          "Invalid place of operation! Please select from the list🔻"
        );
      }
      case this.placeOperation === null: {
        throw Error("Place of operation not provided!");
      }
      case !new LocationDataResponse(this.placeOperation).validate(): {
        throw Error("Invalid place of operation!");
      }
      case !this.services || this.services.length < 1: {
        throw Error("Services not provided!");
      }
    }

    return true;
  }

  toObject(): userRequest | driverRequest {
    if (this.usertype === userTypes.REGULAR) {
      return {
        first_name: this.firstname,
        last_name: this.lastname,
        email: this.email,
        password: this.password,
        phonenumber: this.phonenumber,
        role: this.usertype,
      };
    }
    return {
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      password: this.password,
      phonenumber: this.phonenumber,
      role: this.usertype,
      vehicleRegistration: this.vehicleRegistration,
      vehicleType: this.vehicleType,
      vehicleModel: this.vehicleModel,
      latitude: this.placeOperation.geometry.lat,
      longitude: this.placeOperation.geometry.lng,
      services: this.services,
    };
  }

  toRequest() {
    return JSON.stringify(this.toObject());
  }
}

/**
 * Represents the data required for user login.
 */
export class UserLogInData {
  private __email_reg_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  email_phone: any;
  password: string;
  type: logInTypes;

  constructor({ email_phone = "", password = "", type = logInTypes.EMAIL }) {
    this.email_phone = email_phone;
    this.password = password;
    this.type = type;
  }

  isValid() {
    if (!this.email_phone) {
      throw Error("Email/Phone not provided!");
    } else if (
      (this.type === logInTypes.EMAIL &&
        !this.__email_reg_pattern.test(this.email_phone)) ||
      (this.type === logInTypes.PHONE && isNaN(this.email_phone))
    ) {
      throw Error("Invalid Email/Phone number!");
    } else if (!this.password) {
      throw Error("Password not provided!");
    }

    return true;
  }

  toObject(): userLoginEmail | userLoginPhone {
    if (this.type === logInTypes.EMAIL) {
      return {
        email: this.email_phone,
        password: this.password,
        type: this.type,
      };
    }
    return {
      phone: this.email_phone,
      password: this.password,
      type: this.type,
    };
  }

  toRequest() {
    return JSON.stringify(this.toObject());
  }
}
