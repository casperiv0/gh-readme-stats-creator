import * as React from "react";
import Head from "next/head";
import { Formik } from "formik";

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

      <div className="mt-5 mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold">GitHub README Stats Creator</h1>

        <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
          {({ values, handleBlur, handleSubmit, handleChange }) => (
            <form className="mt-3" onSubmit={handleSubmit}>
              <FormField fieldId="github-username" label="GitHub Username">
                <Input
                  id="github-username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="github-username"
                  required
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
                  className="text-xl my-2 font-semibold cursor-pointer select-none"
                >
                  Advanced Settings &rarr;
                </h3>

                {showAdvanced && (
                  <>
                    <FormField fieldId="custom-host-url" label="Custom host URL">
                      <Input type="url" />
                    </FormField>

                    <FormRow>
                      <FormField fieldId="custom-host-url" label="Theme">
                        <Input />
                      </FormField>
                      <FormField fieldId="custom-host-url" label="Theme">
                        <Input />
                      </FormField>
                      <FormField fieldId="custom-host-url" label="Theme">
                        <Input />
                      </FormField>
                    </FormRow>
                  </>
                )}
              </div>

              <Button type="submit">Generate Badge!</Button>
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
