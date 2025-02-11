import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const taskSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().min(3).max(100).required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  status: Joi.string().valid("open", "in-progress", "completed").required(),
  dueDate: Joi.date().iso().required()
});

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: "Validation error", details: error.details });
  }

  next();
};
