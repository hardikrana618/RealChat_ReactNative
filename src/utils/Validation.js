import * as Yup from 'yup';

const yupString = Yup.string();
const yupNumber = Yup.number();
const yupBoolean = Yup.boolean();

export const UserNameSchema = Yup.object().shape({
  username: yupString
    .matches(/^[a-zA-Z][a-zA-Z0-9._]*$/, 'Username must start with a letter')
    .matches(
      /^(?!.*[_.]{2})/,
      'Username cannot contain consecutive dots or underscores',
    )
    .matches(
      /^[a-zA-Z0-9._]*[a-zA-Z0-9]$/,
      'Username cannot end with a dot or underscore',
    )
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .required('Username is required'),
});

export const groupNameSchema = Yup.object().shape({
  groupName: Yup.string()
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9 _-]*$/,
      'Group name must start with a letter or number',
    )
    .matches(
      /^(?!.*[ _-]{2})/,
      'Group name cannot have consecutive spaces, underscores, or dashes',
    )
    .matches(
      /^[a-zA-Z0-9 _-]*[a-zA-Z0-9]$/,
      'Group name cannot end with a space, underscore, or dash',
    )
    .min(3, 'Group name must be at least 3 characters')
    .max(30, 'Group name cannot exceed 30 characters')
    .required('Group name is required'),
});
export const chatSchema = Yup.object().shape({
  msg: Yup.string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(500, 'Message should not exceed 500 characters'),
});
