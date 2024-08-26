import { useEffect, useMemo } from "react";

export const DomainRef = {
  value: "crustcloud.io",
};

const supportDomain = ["crustcloud.io", "crustcloud.app"];

export const getAvilableDomain = () => {
  if (location.hostname == "localhost") return supportDomain[0];
  if (location.hostname.match(/^\d+\.\d+\.\d+\.\d+$/)?.length == 1) return supportDomain[0];
  const domains = location.hostname.split(".");
  let domain = domains.slice(-2).join(".");
  if (domains[1] == "ipns") {
    domain = domains[0].replaceAll("-", ".");
  }
  if (supportDomain.includes(domain)) {
    return domain;
  }
  return supportDomain[0];
};
export function useConfigDomain() {
  useEffect(() => {
    DomainRef.value = getAvilableDomain();
  }, []);
}

export function useSetDomain() {
  useMemo(() => {
    DomainRef.value = getAvilableDomain();
  }, []);
}
