import * as React from "react";
import Head from "next/head";
import { Formik } from "formik";
import { ArrowDownShort } from "react-bootstrap-icons";

import type { GetStaticProps } from "next";
import type { Values } from "types/Values";
import type { Themes } from "types/Theme";
import { Button } from "components/Button";
import { FormField } from "components/FormField";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { Toggle } from "components/Toggle";
import { FormRow } from "components/FormRow";
import { generateBadgeUrl } from "lib/generator";
import { Preview } from "components/Preview";
import { validate } from "lib/validation";
import { Error } from "components/Error";

const INITIAL_VALUES: Values = {
  "github-username": "",
  theme: "default",
  "show-icons": true,
  "count-private-contributions": false,
  "custom-title": "",
  "disable-animations": false,
  "hide-rank": false,
  "hide-title": false,
  "include-all-commits": false,
  "line-height": 25,
  "custom-host-url": "",

  "colors.title_color": "",
  "colors.icon_color": "",
  "colors.text_color": "",
  "colors.bg_color": "",
  "colors.border_color": "",
};

interface Props {
  themes: Themes;
}

export default function Index({ themes }: Props) {
  const [showAdvanced, setAdvanced] = React.useState<boolean>(false);
  const [url, setUrl] = React.useState<string | null>(null);

  async function onSubmit(data: Values) {
    setUrl(null);

    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    setUrl(() => generateBadgeUrl(data));
  }

  return (
    <>
      <Head>
        <title>GitHub README Stats Creator</title>
      </Head>

      <div className="mt-5 mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold">GitHub README Stats Creator</h1>

        <Formik validate={validate} initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
          {({ errors, touched, values, resetForm, handleBlur, handleSubmit, handleChange }) => (
            <form className="mt-3" onSubmit={handleSubmit}>
              <FormField fieldId="github-username" label="GitHub Username">
                <Input
                  id="github-username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="github-username"
                  required
                />
                <Error
                  touched={touched["github-username"]}
                  message={errors["github-username"] && errors["github-username"]}
                />
              </FormField>

              <FormField fieldId="theme" label="Theme">
                <Select
                  id="theme"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="theme"
                  required
                >
                  {Object.entries(themes).map(([key]) => (
                    <option value={key} key={key}>
                      {key}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormRow justify={false}>
                <FormField fieldId="custom-title" label="Custom Title">
                  <Input
                    disabled={values["hide-title"]}
                    id="custom-title"
                    onChange={handleChange}
                  />
                </FormField>

                <FormField fieldId="line-height" label="Line Height">
                  <Input
                    value={values["line-height"]}
                    type="number"
                    id="line-height"
                    onChange={handleChange}
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField fieldId="show-icons" label="Show Icons">
                  <Toggle name="show-icons" onClick={handleChange} toggled={values["show-icons"]} />
                </FormField>

                <FormField fieldId="hide-rank" label="Hide Rank">
                  <Toggle name="hide-rank" onClick={handleChange} toggled={values["hide-rank"]} />
                </FormField>

                <FormField fieldId="hide-title" label="Hide Title">
                  <Toggle name="hide-title" onClick={handleChange} toggled={values["hide-title"]} />
                </FormField>

                <FormField fieldId="disable-animations" label="Disable Animations">
                  <Toggle
                    name="disable-animations"
                    onClick={handleChange}
                    toggled={values["disable-animations"]}
                  />
                </FormField>
              </FormRow>

              <FormRow justify={false}>
                <FormField fieldId="include-all-commits" label="Include All Commits">
                  <Toggle
                    name="include-all-commits"
                    onClick={handleChange}
                    toggled={values["include-all-commits"]}
                  />
                </FormField>

                <FormField
                  fieldId="count-private-contributions"
                  label="Count Private Contributions"
                >
                  <Toggle
                    name="count-private-contributions"
                    onClick={handleChange}
                    toggled={values["count-private-contributions"]}
                  />
                </FormField>
              </FormRow>

              <div className="mb-3">
                <h3
                  onClick={() => setAdvanced((o) => !o)}
                  className="text-xl my-2 font-semibold cursor-pointer select-none flex items-center"
                >
                  Advanced Settings{" "}
                  <span
                    className="transition mr-2 mt-1"
                    style={{ transform: `rotate(${showAdvanced ? "0deg" : "-90deg"})` }}
                  >
                    <ArrowDownShort />
                  </span>
                </h3>

                <div className={showAdvanced ? "" : "hidden"}>
                  <FormField fieldId="custom-host-url" label="Custom host URL">
                    <Input onChange={handleChange} id="custom-host-url" type="url" />
                    <Error
                      touched={touched["custom-host-url"]}
                      message={errors["custom-host-url"]}
                    />
                  </FormField>

                  <h4 className="text-l font-semibold mb-2 mt-5">Custom Theme</h4>
                  <FormRow gridLike>
                    <FormField
                      includeMargin={false}
                      fieldId="colors.bg_color"
                      label="Background Color"
                    >
                      <Input id="colors.bg_color" onChange={handleChange} />
                      <Error
                        touched={touched["colors.bg_color"]}
                        message={errors["colors.bg_color"]}
                      />
                    </FormField>
                    <FormField
                      includeMargin={false}
                      fieldId="colors.border_color"
                      label="Border Color"
                    >
                      <Input id="colors.border_color" onChange={handleChange} />
                      <Error
                        touched={touched["colors.border_color"]}
                        message={errors["colors.border_color"]}
                      />
                    </FormField>
                    <FormField includeMargin={false} fieldId="colors.icon_color" label="Icon Color">
                      <Input id="colors.icon_color" onChange={handleChange} />
                      <Error
                        touched={touched["colors.icon_color"]}
                        message={errors["colors.icon_color"]}
                      />
                    </FormField>
                    <FormField includeMargin={false} fieldId="colors.text_color" label="Text Color">
                      <Input id="colors.text_color" onChange={handleChange} />
                      <Error
                        touched={touched["colors.text_color"]}
                        message={errors["colors.text_color"]}
                      />
                    </FormField>
                    <FormField
                      includeMargin={false}
                      fieldId="colors.title_color"
                      label="Title Color"
                    >
                      <Input id="colors.title_color" onChange={handleChange} />
                      <Error
                        touched={touched["colors.title_color"]}
                        message={errors["colors.title_color"]}
                      />
                    </FormField>
                  </FormRow>
                </div>
              </div>

              <Button disabled={!(Object.keys(errors).length <= 0)} type="submit">
                Generate Badge!
              </Button>
              <Button
                onClick={() => {
                  resetForm();
                  setUrl(null);
                }}
                className="ml-2 bg-transparent dark:bg-transparent text-red-500 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white focus:bg-red-500 dark:focus:bg-red-500 focus:text-white"
                type="reset"
              >
                Reset
              </Button>
            </form>
          )}
        </Formik>

        {url && <Preview url={url} />}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const url = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const data = await fetch(`${url}/api/themes`)
    .then((v) => v.json())
    .catch(() => null);

  return {
    // revalidate every hour
    revalidate: 60 * 60,
    props: {
      themes: data?.themes ?? [],
    },
  };
};
