interface Props {
  message?: string | false;
  touched?: boolean;
}

export const Error = ({ touched, message }: Props) => {
  if (!touched && !message) {
    return null;
  }

  return <span className="-mt-0 text-red-500">{message}</span>;
};
