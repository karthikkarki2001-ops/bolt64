import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../middleware/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, ...otherData } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      role,
      status: role === 'therapist' ? 'pending' : undefined,
      verified: role === 'patient',
      ...otherData
    });

    await user.save();

    const token = generateToken((user._id as any).toString(), user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ error: `This account is not registered as a ${role}` });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken((user._id as any).toString(), user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        verified: user.verified,
        profilePicture: user.profilePicture,
        profilePhotoUrl: user.profilePhotoUrl,
        emergencyContactEmail: user.emergencyContactEmail,
        emergencyContactRelation: user.emergencyContactRelation,
        age: user.age,
        specialization: user.specialization,
        experience: user.experience,
        location: user.location,
        hourlyRate: user.hourlyRate,
        licenseNumber: user.licenseNumber,
        phone: user.phone,
        bio: user.bio,
        availability: user.availability
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
