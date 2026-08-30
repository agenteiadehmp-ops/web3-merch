import type {
  CollectionRecord,
  LicenseStatus,
} from "@/types/collections";

export function isCollectionMerchEnabled(
  collection: Pick<
    CollectionRecord,
    "status" | "license_status" | "merchandising_enabled"
  >,
): boolean {
  return (
    collection.status === "active" &&
    collection.license_status === "approved" &&
    collection.merchandising_enabled
  );
}

export function canApproveMerchandising(
  licenseStatus: LicenseStatus,
): boolean {
  return licenseStatus === "approved";
}
