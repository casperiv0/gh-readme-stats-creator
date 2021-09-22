import Head from "next/head";
import { Formik } from "formik";

import { Button } from "components/Button";
import { FormField } from "components/FormField";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { Values } from "types/Values";
import { Toggle } from "components/Toggle";
import { FormRow } from "components/FormRow";

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
  "line-height": 15,
};

export default function Index() {
  function onSubmit(data: Values) {
    console.log(data);
  }

  return (
    <>
      <Head>
        <title>Hello world!</title>
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
                  {/* todo: fetch all themes */}
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </Select>
              </FormField>

              <FormRow justify={false}>
                <FormField fieldId="custom-title" label="Custom Title">
                  <Input id="custom-title" onChange={handleChange} />
                </FormField>

                <FormField fieldId="line-height" label="Custom Title">
                  <Input type="number" id="line-height" onChange={handleChange} />
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

              <Button type="submit">Generate Badge!</Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
