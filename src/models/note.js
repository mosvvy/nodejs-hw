/*
title — обов’язковий рядок, з параметром trim: true
content — необов’язковий рядок (за замовчуванням порожній), з параметром trim: true
tag — приймає одне із фіксованих значень
  (Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo).
  Необов’язковий рядок (за замовчуванням Todo)

*/

import { model } from 'mongoose';
import { Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

noteSchema.index({ title: 'text', content: 'text' });

export const Note = model('Note', noteSchema);
